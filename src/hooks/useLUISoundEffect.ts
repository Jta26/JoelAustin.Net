import { useCallback } from "react";

let sharedAudioContext: AudioContext | null = null;

type AudioWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

function getAudioContext() {
  if (typeof window === "undefined") {
    return null;
  }

  const audioWindow = window as AudioWindow;
  const AudioContextConstructor =
    audioWindow.AudioContext ?? audioWindow.webkitAudioContext;

  if (AudioContextConstructor === undefined) {
    return null;
  }

  sharedAudioContext ??= new AudioContextConstructor();

  return sharedAudioContext;
}

function connectEnvelope(
  audioContext: AudioContext,
  startTime: number,
  duration: number,
  peakVolume: number,
) {
  const gain = audioContext.createGain();

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(peakVolume, startTime + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  gain.connect(audioContext.destination);

  return gain;
}

type LUISoundEffectOptions = {
  type: "hover";
};

function playHoverEffect(audioContext: AudioContext) {
  const startTime = audioContext.currentTime;
  const duration = 0.095;
  const output = connectEnvelope(audioContext, startTime, duration, 0.09);
  const filter = audioContext.createBiquadFilter();
  const body = audioContext.createOscillator();
  const edge = audioContext.createOscillator();
  const spark = audioContext.createOscillator();
  const edgeGain = connectEnvelope(audioContext, startTime, 0.052, 0.027);
  const sparkGain = connectEnvelope(audioContext, startTime, 0.034, 0.018);

  filter.type = "bandpass";
  filter.frequency.setValueAtTime(5200, startTime);
  filter.frequency.exponentialRampToValueAtTime(4720, startTime + duration);
  filter.Q.setValueAtTime(6.5, startTime);
  filter.connect(output);

  body.type = "triangle";
  body.frequency.setValueAtTime(5100, startTime);
  body.frequency.exponentialRampToValueAtTime(4680, startTime + 0.06);
  body.detune.setValueAtTime(0, startTime);
  body.detune.linearRampToValueAtTime(-2, startTime + duration);
  body.connect(filter);

  edge.type = "square";
  edge.frequency.setValueAtTime(2550, startTime);
  edge.frequency.exponentialRampToValueAtTime(2380, startTime + 0.045);
  edge.connect(edgeGain);

  spark.type = "sine";
  spark.frequency.setValueAtTime(8800, startTime);
  spark.frequency.exponentialRampToValueAtTime(7900, startTime + 0.026);
  spark.connect(sparkGain);

  body.start(startTime);
  edge.start(startTime);
  spark.start(startTime);
  body.stop(startTime + duration);
  edge.stop(startTime + 0.056);
  spark.stop(startTime + 0.034);

  body.onended = () => {
    body.disconnect();
    filter.disconnect();
    output.disconnect();
  };

  edge.onended = () => {
    edge.disconnect();
    edgeGain.disconnect();
  };

  spark.onended = () => {
    spark.disconnect();
    sparkGain.disconnect();
  };
}

function playSoundEffect(audioContext: AudioContext, type: LUISoundEffectOptions["type"]) {
  if (type === "hover") {
    playHoverEffect(audioContext);
  }
}

export function useLUISoundEffect({ type }: LUISoundEffectOptions) {
  return useCallback(() => {
    const audioContext = getAudioContext();

    if (audioContext === null) {
      return;
    }

    if (audioContext.state === "suspended") {
      void audioContext.resume().then(() => {
        playSoundEffect(audioContext, type);
      });

      return;
    }

    playSoundEffect(audioContext, type);
  }, [type]);
}

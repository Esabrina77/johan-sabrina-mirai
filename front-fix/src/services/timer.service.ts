type TimerCallback = () => void;

class ApplicationTimerService {
  private timers: Map<number, {
    timer: NodeJS.Timeout;
    startTime: number;
  }> = new Map();

  startTimer(missionId: number, callback: TimerCallback): void {
    const TIMER_DURATION = 3 * 60 * 1000; // 3 minutes en millisecondes
    const startTime = Date.now();
    
    const timer = setTimeout(() => {
      this.timers.delete(missionId);
      callback();
    }, TIMER_DURATION);

    this.timers.set(missionId, { timer, startTime });
  }

  clearTimer(missionId: number): void {
    const timerData = this.timers.get(missionId);
    if (timerData) {
      clearTimeout(timerData.timer);
      this.timers.delete(missionId);
    }
  }

  getRemainingTime(missionId: number): number {
    const timerData = this.timers.get(missionId);
    if (!timerData) return 0;

    const TIMER_DURATION = 3 * 60 * 1000;
    const elapsed = Date.now() - timerData.startTime;
    return Math.max(0, TIMER_DURATION - elapsed);
  }

  hasActiveTimer(missionId: number): boolean {
    return this.timers.has(missionId);
  }
}

export const applicationTimerService = new ApplicationTimerService(); 
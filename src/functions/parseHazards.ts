const WazeIconIdentifiers = {
  majorCrash: 'major',
  minorCrash: 'minor',
  policeVisible: 'visible',
  policeHidden: 'hidden',
  vehicleOnShoulder: 'shoulder-car-stopped',
  roadClosed: 'closed',
  construction: 'construction',
  potHole: 'pot-hole',
  objectOnRoad: 'object',
  trafficHeavy: 'heavy-traffic',
  trafficStandstill: 'stand-still-traffic',
  roadKill: 'road-kill',
};

interface Hazard {
  x: number;
  y: number;
  width: number;
  height: number;
}

const parseHazards = () => {
  const hazards: Hazard[] = [];
  if (typeof window !== 'undefined') {
    for (let value of Object.values(WazeIconIdentifiers)) {
      const elements = document.querySelectorAll(`[class*="${value}"]`);
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const width = rect.width;
        const height = rect.height;
        hazards.push({ x, y, width, height });
      });
    }
  }
  return hazards;
};

export default parseHazards;

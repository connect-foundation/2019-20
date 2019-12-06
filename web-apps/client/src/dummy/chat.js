export default (startTime = new Date()) => {
  const startDate = new Date(startTime);
  function getRandomInt(_min, _max) {
    const min = Math.ceil(_min);
    const max = Math.floor(_max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return new Array(30)
    .fill(0)
    .map((_, i) => i)
    .reduce((acc, cur, idx) => {
      const baseDate = new Date(startDate.setDate(startDate.getDate() - idx));
      return [
        ...acc,
        {
          id: getRandomInt(0, 2),
          content:
            'Proactively implement interoperable products through cross-media schemas. Completely network goal-oriented benefits without unique ideas. ',
          timestamp: new Date(
            baseDate.setHours(baseDate.getHours() - 1),
          ).toISOString(),
        },
        {
          id: getRandomInt(0, 2),
          content:
            'Dramatically innovate impactful supply chains without adaptive innovation. Proactively impact ',
          timestamp: new Date(
            baseDate.setHours(baseDate.getHours() - 2),
          ).toISOString(),
        },
        {
          id: getRandomInt(0, 2),
          content: 'this is left',
          timestamp: new Date(
            baseDate.setHours(baseDate.getHours() - 3),
          ).toISOString(),
        },
      ];
    }, []);
};

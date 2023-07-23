interface Point {
  x: number;
  y: number;
}

interface Projection {
  min: number;
  max: number;
}

interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Triangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

const handleHazardCollision = (box: Box, triangle: Triangle): boolean => {
  const getBoxCorners = (box: Box): Point[] => {
    const { x, y, width, height } = box;
    return [
      { x: x - width / 2, y: y - height / 2 },
      { x: x + width / 2, y: y - height / 2 },
      { x: x + width / 2, y: y + height / 2 },
      { x: x - width / 2, y: y + height / 2 },
    ];
  };

  const getTriangleCorners = (triangle: Triangle): Point[] => {
    const { x, y, width, height } = triangle;
    // triangle is upside down + calculates based on the center point of the triangle
    return [
      { x: x - width / 2, y: y - height / 2 }, // bottom-left point
      { x: x + width / 2, y: y - height / 2 }, // bottom-right point
      { x, y: y + height / 2 }, // top point
    ];
  };

  const getEdgeNormal = (p1: Point, p2: Point): Point => {
    const edge = { x: p2.x - p1.x, y: p2.y - p1.y };
    return { x: -edge.y, y: edge.x };
  };

  const projectPolygon = (polygon: Point[], axis: Point): Projection => {
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;

    for (const point of polygon) {
      const projection = axis.x * point.x + axis.y * point.y;
      min = Math.min(min, projection);
      max = Math.max(max, projection);
    }

    return { min, max };
  };

  const boxCorners = getBoxCorners(box);
  const triangleCorners = getTriangleCorners(triangle);
  const bullshitChecker: Point = { x: 0, y: 0 }; // putting this here to make TS happy bc it sucks when working with arrays

  const boxEdges = [
    getEdgeNormal(boxCorners[0] ?? bullshitChecker, boxCorners[1] ?? bullshitChecker), // prettier-ignore
    getEdgeNormal(boxCorners[1] ?? bullshitChecker, boxCorners[2] ?? bullshitChecker), // prettier-ignore
  ];

  const triangleEdges = [
    getEdgeNormal(triangleCorners[0] ?? bullshitChecker, triangleCorners[1] ?? bullshitChecker), // prettier-ignore
    getEdgeNormal(triangleCorners[1] ?? bullshitChecker, triangleCorners[2] ?? bullshitChecker), // prettier-ignore
    getEdgeNormal(triangleCorners[2] ?? bullshitChecker, triangleCorners[0] ?? bullshitChecker), // prettier-ignore
  ];

  const axes = [...boxEdges, ...triangleEdges];
  for (const axis of axes) {
    const boxProjection = projectPolygon(boxCorners, axis);
    const triangleProjection = projectPolygon(triangleCorners, axis);

    if (
      boxProjection.min > triangleProjection.max ||
      triangleProjection.min > boxProjection.max
    ) {
      console.log('No collision detected', {
        boxX: box.x,
        boxY: box.y,
        triangleX: triangle.x,
        triangleY: triangle.y,
      });
      return false;
    }
  }

  console.log('Collision detected', {
    boxX: box.x,
    boxY: box.y,
    triangleX: triangle.x,
    triangleY: triangle.y,
  });
  return true;
};

export default handleHazardCollision;

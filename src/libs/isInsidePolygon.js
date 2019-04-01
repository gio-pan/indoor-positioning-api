// function to check if a point is inside a polygon (given as a list of vertices)

// check if a point is on a segment
// returns true if point is on segment, false if not
const onSegment = (segment, point) => {
    if (point.x <= Math.max(segment.start.x, segment.end.x)
        && point.x >= Math.min(segment.start.x, segment.end.x)
        && point.y <= Math.max(segment.start.y, segment.end.y)
        && point.y >= Math.min(segment.start.y, segment.end.y)) {
        return true;
    }
    return false;
};

// determine orientation of 3 ordered points (colinear, clockwise, or counterclockwise)
const orientation = (point1, point2, point3) => {
    const val = (point2.y - point1.y) * (point3.x - point2.x)
                - (point2.x - point1.x) * (point3.y - point2.y);

    if (val === 0) return 0; // colinear

    return (val > 0) ? 1 : 2; // clockwise or counterclockwise
};

// determine if 2 lines intersect
// returns true if 2 lines intersect, false if not
const intersects = (line1, line2) => {
    const o1 = orientation(line1.start, line1.end, line2.start);
    const o2 = orientation(line1.start, line1.end, line2.end);
    const o3 = orientation(line2.start, line2.end, line1.start);
    const o4 = orientation(line2.start, line2.end, line1.end);

    if (o1 !== o2 && o3 !== o4) return true;
    if (o1 === 0 && onSegment(line1, line2.start)) return true;
    if (o2 === 0 && onSegment(line1, line2.end)) return true;
    if (o3 === 0 && onSegment(line2, line1.start)) return true;
    if (o4 === 0 && onSegment(line2, line1.end)) return true;
    return false;
};

// MAIN FUNCTION
// check if a point is in a polygon
// input: vertices - a list of vertices (at least 3) that form a polygon
//        ex: [{ x: <number>, y: <number>}, { x: <number>, y: <number>}, ...]
//        point - a point = { x: <number>, y: <number>}
// returns true if poitn is inside polygon, false if not
const isInsidePolygon = (vertices, point) => {
    const n = vertices.length;

    // not a polygon if less than 3 vertices
    if (n < 3) {
        return false;
    }

    // cast horizontal ray from point to all the way to the right
    const rayCast = {
        start: point,
        end: {
            x: Number.MAX_SAFE_INTEGER,
            y: point.y,
        },
    };

    let count = 0;

    for (let i = 0; i < n; ++i) {
        const nextIndex = (i + 1) % n;
        const vertex1 = vertices[i];
        const vertex2 = vertices[nextIndex];

        // create line segment from 2 vertices
        const segment = {
            start: vertex1,
            end: vertex2,
        };

        // check if 2 segments intersect (horizontal ray and segment formed from 2 vertices)
        if (intersects(segment, rayCast)) {
            // check if point is colinear with segment
            if (orientation(vertex1, point, vertex2) === 0) {
                // true if point is on segment
                return onSegment(segment, point);
            }
            count += 1;
        }
    }

    // ray casting algorithm:
    // point is inside polygon if the ray intersects an odd number of edges
    if (count % 2 === 0) {
        return false;
    }
    return true;
};

// test:
// const x1y1 = { x: 0, y: 0 };
// const x2y2 = { x: 0.1, y: 0 };
// const x3y3 = { x: 0.1, y: 0.1 };
// const x4y4 = { x: 0, y: 0.1 };
// const polygon = [
//     x1y1,
//     x2y2,
//     x3y3,
//     x4y4,
// ];
// const point = { x: -0.01, y: 0.1 };
// console.log(isInside(polygon, point));

module.exports = isInsidePolygon;

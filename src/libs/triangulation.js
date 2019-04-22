const Trilateration = require('./trilateration');

function rssi_to_distance(rssi) {
    const distances = [0, 0, 0];
    for (let i = 0; i < rssi.length; i++) {
        // fill in with proper formula
        distances[i] = Math.E ** ((rssi[i] - 27.348) / 9.088);
    }
    return distances;
}

// find center of 3 points
function center3(points) {
    // find midpoint of 2 points
    let locations = [0, 0];
    let midpoint = [(points[1][0] + points[2][0]) / 2, (points[1][1] + points[2][1]) / 2]
    //find point 2/3 of the way from last point to the midpoint
    let centroid = [(points[0][0] + midpoint[0]) * (2 / 3), (points[0][1] + midpoint[1]) * (2 / 3)]
    locations[0] = centroid[0];
    locations[1] = centroid[1];
    return locations;
}

//find where the 3 equations center
function intersect3(distances, centers) {
    //find intersections of 3 circles
    let combinations = [
        [0, 1],
        [1, 2],
        [0, 2]
    ];
    let how_many_intersections = [0, 0, 0],
        cx1, cx2, cy1, cy2;
    let x1 = [0, 0, 0],
        x2 = [0, 0, 0],
        y1 = [0, 0, 0],
        y2 = [0, 0, 0];
    let c1, c2, a, b, c, determinant, r1, r2;
    for (let i = 0; i < 3; i++) {
        r1 = distances[combinations[i][0]]; // radius of first circle
        r2 = distances[combinations[i][1]]; // radius of second circle
        cx1 = centers[combinations[i][0]][0]; // center x of first circle
        cx2 = centers[combinations[i][1]][0]; // center x of second circle
        cy1 = centers[combinations[i][0]][1]; // center y of first circle
        cy2 = centers[combinations[i][1]][1]; // center y of second circle
        if (cx1 == cx2) {
            c1 = (r1 ** 2 - r2 ** 2 - cy1 ** 2 + cy2 ** 2) / (2 * cy2 - 2 * cy1);
            a = 1;
            b = -2 * cx1;
            c = cx1 ** 2 - r1 ** 2 + (c1 - cy1) ** 2;
            determinant = b ** 2 - 4 * a * c;
            if (determinant > 0) {
                how_many_intersections[i] = 2;
                y1[i] = c1;
                y2[i] = c1;
                x1[i] = (-b + Math.sqrt(determinant)) / (2 * a);
                x2[i] = (-b - Math.sqrt(determinant)) / (2 * a);

            } else if (determinant == 0) {
                how_many_intersections[i] = 1;
                y1[i] = c1;
                x1[i] = Math.sqrt(r1 ** 2 - (c1 - cy1) ** 2);
            } else {
                how_many_intersections[i] = 0;
            }

        } else if (cy1 == cy2) {
            c1 = (r1 ** 2 - r2 ** 2 - cx1 ** 2 + cx2 ** 2) / (2 * cx2 - 2 * cx1);
            a = 1;
            b = -2 * cy1;
            c = cy1 ** 2 - r1 ** 2 + (c1 - cx1) ** 2;
            determinant = b ** 2 - 4 * a * c;
            if (determinant > 0) {
                how_many_intersections[i] = 2;
                y1[i] = (-b + Math.sqrt(determinant)) / (2 * a);
                y2[i] = (-b - Math.sqrt(determinant)) / (2 * a);
                x1[i] = c1;
                x2[i] = c1;

            } else if (determinant == 0) {
                how_many_intersections[i] = 1;
                y1[i] = Math.sqrt(r1 ** 2 - (c1 - cx1) ** 2) / (2 * a);
                x1[i] = c1;
            } else {
                how_many_intersections[i] = 0;
            }

        } else {
            c1 = (r2 ** 2 - r1 ** 2 - (cx2 ** 2 - cx1 ** 2) - (cy2 ** 2 - cy1 ** 2)) / (2 * cx1 - 2 * cx2);
            c2 = -1 * (2 * cy1 - 2 * cy2) / (2 * cx1 - 2 * cx2);
            a = c2 ** 2 + 1;
            b = -2 * c1 * c2 + 2 * cx1 * c2 - 2 * cy1;
            c = c1 ** 2 - cx1 ** 2 + 2 * cx1 * c1 + cy1 ** 2 - r1 ** 2;

            determinant = b ** 2 - 4 * a * c;
            if (determinant > 0) {
                how_many_intersections[i] = 2;
                y1[i] = (-b + Math.sqrt(determinant)) / (2 * a);
                y2[i] = (-b - Math.sqrt(determinant)) / (2 * a);
                x1[i] = c1 - c2 * y1[i];
                x2[i] = c1 - c2 * y2[i];

            } else if (determinant == 0) {
                how_many_intersections[i] = 1;
                y1[i] = (-b + Math.sqrt(determinant)) / (2 * a);
                x1[i] = c1 - c2 * y1[i];
            } else {
                how_many_intersections[i] = 0;
            }
        }
    }
    //if they all intersect at same point
    if ((how_many_intersections[0] == 1) && (how_many_intersections[1] == 1) && (how_many_intersections[2] == 1)) {
        var point = [x1[0], y1[0]];
        return point;
    }

    const p = [
        [0, 0],
        [0, 0],
        [0, 0]
    ];
    // choose 1 point for each circle
    let doOutside = false;

    for (let i = 0; i < 3; i++) {
        r1 = distances[combinations[i][0]]; // radius of first circle
        r2 = distances[combinations[i][1]]; // radius of second circle
        cx1 = centers[combinations[i][0]][0]; // center x of first circle
        cx2 = centers[combinations[i][1]][0]; // center x of second circle
        cy1 = centers[combinations[i][0]][1]; // center y of first circle
        cy2 = centers[combinations[i][1]][1]; // center y of second circle

        if (how_many_intersections[i] == 0) {
            //if it doesn't intersect at all find midpoint between the edges of both circles
            var mag = Math.sqrt((cx2 - cx1) ** 2 + (cy2 - cy1) ** 2);
            var cx = r1 * (cx2 - cx1) / mag;
            var cy = r1 * (cy2 - cy1) / mag;
            var edge1 = [cx + cx1, cy + cy1];
            mag = Math.sqrt((cx1 - cx2) ** 2 + (cy1 - cy2) ** 2);
            cx = r2 * (cx1 - cx2) / mag;
            cy = r2 * (cy1 - cy2) / mag;
            var edge2 = [cx + cx2, cy + cy2];
            p[i] = [(edge1[0] + edge2[0]) / 2, (edge1[1] + edge2[1]) / 2];
        } else if (how_many_intersections == 1) {
            p[i] = [x1[i], y1[i]];
        } else {
            //find which point is closer to the other points
            if ((how_many_intersections[0] + how_many_intersections[1] + how_many_intersections[2] - 2) > 0) {
                var dist1, dist2 = 0;
                for (var j = 0; j < 3; j++) {
                    if (j == i) j++;
                    if (j == 3) break;
                    if (how_many_intersections[j] == 1) {
                        dist1 += (x1[j] - x1[i]) ** 2 + (y1[j] - y1[i]) ** 2;
                        dist2 += (x1[j] - x2[i]) ** 2 + (y1[j] - y2[i]) ** 2;
                    } else if (how_many_intersections[j] == 2) {
                        dist1 += (x2[j] - x1[i]) ** 2 + (y2[j] - y1[i]) ** 2;
                        dist2 += (x2[j] - x2[i]) ** 2 + (y2[j] - y2[i]) ** 2;
                    }

                }
                if (dist1 < dist2) {
                    p[i] = [x1[i], y1[i]];
                } else {
                    p[i] = [x2[i], y2[i]];
                }
            } else {
                doOutside = true;
            }
        }
    }
    // if there was only a pair of intersections
    if (doOutside) {

        var index = 0;
        for (var i = 0; i < 3; i++) {
            if (how_many_intersections[i] == 2) {
                index = i;
                break;
            }
        }
        var point1 = [x1[index], y1[index]];
        var point2 = [x2[index], y2[index]];
        var dist1 = 0;
        var dist2 = 0;

        for (var i = 0; i < 3; i++) {

            //skip this point
            if (i == index) {
                continue;
            }
            dist1 += ((point1[0] - (p[i])[0]) ** 2 + (point1[1] - (p[i])[1]) ** 2);
            dist2 += ((point2[0] - (p[i])[0]) ** 2 + (point2[1] - (p[i])[1]) ** 2);
        }
        if (dist1 < dist2) {
            p[index][0] = point1[0];
            p[index][1] = point1[1];
        } else {
            p[index][0] = point2[0];
            p[index][1] = point2[1];
        }

    }
    console.log(p);
    return center3(p);
}

// function triangulate(rssi1, rssi2, rssi3) {
function triangulate(wifiScans, routers, xScale, yScale) {
    if (wifiScans.length !== 3 && routers.length !== 3) {
        throw new Error('Need 3 points to triangulate!');
    }
    const rssis = wifiScans.map(scan => Math.abs(scan.rssi));
    const centers = routers.map(router => [router.x * xScale, router.y * yScale]);
    console.log(centers);
    const distances = rssi_to_distance(rssis);
    console.log('distances: ', distances);
    const input = [
        [centers[0][0], centers[0][1], distances[0]],
        [centers[1][0], centers[1][1], distances[1]],
        [centers[2][0], centers[2][1], distances[2]],
    ];
    const location = Trilateration.trilat(input);
    console.log(location);
    if (location !== null) {
        return [location[0] / xScale, location[1] / yScale]
    }
    return [0, 0];
    // const intersectInMeters = intersect3(distances, centers);
    // console.log([intersectInMeters[0] / xScale, intersectInMeters[1] / yScale]);
    // return [intersectInMeters[0] / xScale, intersectInMeters[1] / yScale];
}

// console.log("location: ", triangulate(-56.4, -35.4, -51));

module.exports = {
    triangulate: triangulate,
};

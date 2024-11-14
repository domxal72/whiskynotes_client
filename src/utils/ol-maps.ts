// TODO: this file can be removed

type CoorsFormat = [number, number]

export function lanLonToCoors(coordinates: CoorsFormat): CoorsFormat {

  // epsg4326 to epsg3857

  let x = coordinates[0];
  let y = coordinates[1];
  x = (coordinates[0] * 20037508.34) / 180;
  y =
    Math.log(Math.tan(((90 + coordinates[1]) * Math.PI) / 360)) /
    (Math.PI / 180);
  y = (y * 20037508.34) / 180;
  return [x, y];
}

export function coorsToLonLan(pos: CoorsFormat): CoorsFormat {

  // epsg3857 to epsg4326
  
  let x = pos[0];
  let y = pos[1];
  x = (x * 180) / 20037508.34;
  y = (y * 180) / 20037508.34;
  y = (Math.atan(Math.pow(Math.E, y * (Math.PI / 180))) * 360) / Math.PI - 90;
  return [x, y];
}

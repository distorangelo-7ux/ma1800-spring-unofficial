function mapLogic(mapX, mapY, sizeMultiplier) {
  mapSize = 256 * sizeMultiplier

  fill ('#353835');
  rectMode(CENTER);
  rect(mapX, mapY, mapSize, mapSize)

  fill ('#f3f3f3')
  rectMode(CENTER);
  square(mapX,mapY,mapSize / 1.3);

  rectMode(CORNER);
  let incrementX = 0;
  let incrementY = 0;
  for (let i = 1; i < 65; i++) {
    let squareSize = (mapSize / 1.3) / 8;

    fill ('#1e1d1d');
    if (areaOneMap.includes(i - 1)) {fill ('#ffffff');}
    square(
      mapX - (sizeMultiplier * 256) * 0.385 + incrementX,
      mapY - (sizeMultiplier * 256) * 0.385 + incrementY,
      squareSize);
    
    incrementX += squareSize;

    if (i % 8 === 0) {
      incrementX = 0;
      incrementY += squareSize;
    }
  }

}
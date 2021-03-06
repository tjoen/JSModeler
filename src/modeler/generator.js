JSM.GenerateRectangle = function (xSize, ySize)
{
	var result = new JSM.Body ();

	var x = xSize / 2.0;
	var y = ySize / 2.0;
	
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (-x, -y, 0.0)));
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (x, -y, 0.0)));
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (x, y, 0.0)));
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (-x, y, 0.0)));

	result.AddPolygon (new JSM.BodyPolygon ([0, 1, 2, 3]));

	result.SetTextureProjectionType ('Cubic');
	result.SetTextureProjectionCoords (new JSM.CoordSystem (
		new JSM.Coord (-x, -y, 0.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0),
		new JSM.Coord (0.0, 0.0, 1.0)
	));

	return result;
};

JSM.GenerateCuboid = function (xSize, ySize, zSize)
{
	var result = new JSM.Body ();

	var x = xSize / 2.0;
	var y = ySize / 2.0;
	var z = zSize / 2.0;
	
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (-x, -y, -z)));
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (x, -y, -z)));
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (x, -y, z)));
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (-x, -y, z)));
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (-x, y, -z)));
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (x, y, -z)));
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (x, y, z)));
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (-x, y, z)));

	result.AddPolygon (new JSM.BodyPolygon ([0, 1, 2, 3]));
	result.AddPolygon (new JSM.BodyPolygon ([1, 5, 6, 2]));
	result.AddPolygon (new JSM.BodyPolygon ([5, 4, 7, 6]));
	result.AddPolygon (new JSM.BodyPolygon ([4, 0, 3, 7]));
	result.AddPolygon (new JSM.BodyPolygon ([0, 4, 5, 1]));
	result.AddPolygon (new JSM.BodyPolygon ([3, 2, 6, 7]));

	result.SetTextureProjectionType ('Cubic');
	result.SetTextureProjectionCoords (new JSM.CoordSystem (
		new JSM.Coord (-x, -y, -z),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0),
		new JSM.Coord (0.0, 0.0, 1.0)
	));

	return result;
};

JSM.GenerateCuboidSides = function (xSize, ySize, zSize, sides)
{
	var result = new JSM.Body ();

	var x = xSize / 2.0;
	var y = ySize / 2.0;
	var z = zSize / 2.0;
	
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (-x, -y, -z)));
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (x, -y, -z)));
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (x, -y, z)));
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (-x, -y, z)));
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (-x, y, -z)));
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (x, y, -z)));
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (x, y, z)));
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (-x, y, z)));

	if (sides[0]) { result.AddPolygon (new JSM.BodyPolygon ([0, 1, 2, 3])); }
	if (sides[1]) { result.AddPolygon (new JSM.BodyPolygon ([1, 5, 6, 2])); }
	if (sides[2]) { result.AddPolygon (new JSM.BodyPolygon ([5, 4, 7, 6])); }
	if (sides[3]) { result.AddPolygon (new JSM.BodyPolygon ([4, 0, 3, 7])); }
	if (sides[4]) { result.AddPolygon (new JSM.BodyPolygon ([0, 4, 5, 1])); }
	if (sides[5]) { result.AddPolygon (new JSM.BodyPolygon ([3, 2, 6, 7])); }

	result.SetTextureProjectionType ('Cubic');
	result.SetTextureProjectionCoords (new JSM.CoordSystem (
		new JSM.Coord (-x, -y, -z),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0),
		new JSM.Coord (0.0, 0.0, 1.0)
	));

	return result;
};

JSM.GenerateSegmentedRectangle = function (xSize, ySize, xSegmentation, ySegmentation)
{
	function AddVertices ()
	{
		var i, j, coord;

		for (i = 0; i <= ySegmentation; i++) {	
			for (j = 0; j <= xSegmentation; j++) {
				coord = new JSM.Coord (j * xSegment - xStart, i * ySegment - yStart, 0.0);
				result.AddVertex (new JSM.BodyVertex (coord));
			}
		}
	}

	function AddPolygons ()
	{
		var i, j;
		var current, next, top, ntop;
		
		for (j = 0; j < ySegmentation; j++) {
			for (i = 0; i < xSegmentation; i++) {
				current = j * (xSegmentation + 1) + i;
				next = current + 1;
				top = current + xSegmentation + 1;
				ntop = top + 1;
				result.AddPolygon (new JSM.BodyPolygon ([current, next, ntop, top]));
			}
		}
	}

	var result = new JSM.Body ();
	
	var xStart = xSize / 2.0;
	var yStart = ySize / 2.0;
	var xSegment = xSize / xSegmentation;
	var ySegment = ySize / ySegmentation;
	
	AddVertices ();
	AddPolygons ();

	return result;
};

JSM.GenerateSegmentedCuboid = function (xSize, ySize, zSize, segmentation)
{
	function GetLevelOffset (level)
	{
		var offset = 0;
		if (level > 0 && level <= segmentation) {
			offset = (segmentation + 1) * (segmentation + 1) + (level - 1) * (segmentation * 4);
		}
		return offset;
	}

	function GetLevelSideVertices (level)
	{
		var i, j;
		
		var vertices = [];
		var offset = GetLevelOffset (level);
		if (level === 0 || level === segmentation) {
			for (i = 0; i <= segmentation; i++) {
				vertices.push (offset + i);
			}
			for (i = 1; i <= segmentation; i++) {
				vertices.push (offset + (i + 1) * segmentation + i);
			}
			for (i = segmentation - 1; i >= 0; i--) {
				vertices.push (offset + (segmentation + 1) * segmentation + i);
			}
			for (i = segmentation - 1; i > 0; i--) {
				vertices.push (offset + i * (segmentation + 1));
			}
		} else if (level > 0 && level < segmentation) {
			for (i = 0; i <= segmentation; i++) {
				vertices.push (offset + i);
			}
			for (i = 1; i < segmentation; i++) {
				vertices.push (offset + segmentation + 2 * i);
			}
			for (i = segmentation; i >= 0; i--) {
				vertices.push (offset + (3 * segmentation) + i - 1);
			}
			for (i = segmentation - 1; i > 0; i--) {
				vertices.push (offset + segmentation + 2 * i - 1);
			}
		}
		
		return vertices;
	}

	function AddVertices (level)
	{
		var i, j, coord;

		var zCoord = level * zSegment;
		if (level === 0 || level === segmentation) {
			for (i = 0; i <= segmentation; i++) {	
				for (j = 0; j <= segmentation; j++) {
					coord = new JSM.Coord (j * xSegment - xStart, i * ySegment - yStart, zCoord - zStart);
					result.AddVertex (new JSM.BodyVertex (coord));
				}
			}
		} else if (level > 0 && level < segmentation) {
			for (i = 0; i <= segmentation; i++) {
				for (j = 0; j <= segmentation; j++) {
					if (i === 0 || i === segmentation || j === 0 || j === segmentation) {
						coord = new JSM.Coord (j * xSegment - xStart, i * ySegment - yStart, zCoord - zStart);
						result.AddVertex (new JSM.BodyVertex (coord));
					}
				}
			}
		}
	}

	function AddPolygons (level)
	{
		var i, j;
		var current, next, top, ntop;
		
		if (level === 0 || level === segmentation) {
			var offset = GetLevelOffset (level);
			for (i = 0; i < segmentation; i++) {
				for (j = 0; j < segmentation; j++) {
					current = offset + i * (segmentation + 1) + j;
					next = current + 1;
					top = current + segmentation + 1;
					ntop = top + 1;
					if (level === 0) {
						result.AddPolygon (new JSM.BodyPolygon ([current, top, ntop, next]));
					} else {
						result.AddPolygon (new JSM.BodyPolygon ([current, next, ntop, top]));
					}
				}
			}
		}
		
		if (level > 0 && level <= segmentation) {
			var prevSideVertices = levelSideVertices [level - 1];
			var currSideVertices = levelSideVertices [level];
			for (i = 0; i < segmentation * 4; i++) {
				current = prevSideVertices[i];
				top = currSideVertices[i];
				if (i < segmentation * 4 - 1) {
					next = prevSideVertices[i + 1];
					ntop = currSideVertices[i + 1];
				} else {
					next = prevSideVertices[0];
					ntop = currSideVertices[0];
				}
				result.AddPolygon (new JSM.BodyPolygon ([current, next, ntop, top]));
			}
		}
	}

	var result = new JSM.Body ();

	var xStart = xSize / 2.0;
	var yStart = ySize / 2.0;
	var zStart = zSize / 2.0;
	
	var xSegment = xSize / segmentation;
	var ySegment = ySize / segmentation;
	var zSegment = zSize / segmentation;
	
	var i;
	for (i = 0; i <= segmentation; i++) {
		AddVertices (i);
	}
	
	var levelSideVertices = [];
	for (i = 0; i <= segmentation; i++) {
		levelSideVertices.push (GetLevelSideVertices (i));
	}

	for (i = 0; i <= segmentation; i++) {
		AddPolygons (i);
	}

	return result;
};

JSM.GenerateCircle = function (radius, segmentation)
{
	var result = new JSM.Body ();
	var segments = segmentation;

	var theta = 2.0 * Math.PI;
	var step = 2.0 * Math.PI / segments;
	
	var i;
	for (i = 0; i < segments; i++) {
		result.AddVertex (new JSM.BodyVertex (JSM.CylindricalToCartesian (radius, 0.0, theta)));
		theta -= step;
	}

	var topPolygon = new JSM.BodyPolygon ();
	for (i = 0; i < segments; i++) {
		topPolygon.AddVertexIndex (segments - i - 1);
	}
	result.AddPolygon (topPolygon);

	result.SetTextureProjectionType ('Cylindrical');
	result.SetTextureProjectionCoords (new JSM.CoordSystem (
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (radius, 0.0, 0.0),
		new JSM.Coord (0.0, radius, 0.0),
		new JSM.Coord (0.0, 0.0, 1.0)
	));

	return result;
};

JSM.GenerateSphere = function (radius, segmentation, isCurved)
{
	var result = new JSM.Body ();

	var segments = segmentation;
	var circle = segments * 2;

	var topIndex = result.AddVertex (new JSM.BodyVertex (JSM.SphericalToCartesian (radius, 0.0, 0.0)));
	var step = Math.PI / segments;
	var theta = step;
	
	var i, j, phi;
	for (i = 1; i < segments; i++) {
		phi = 0;
		for (j = 0; j < circle; j++) {
			result.AddVertex (new JSM.BodyVertex (JSM.SphericalToCartesian (radius, theta, phi)));
			phi += step;
		}
		theta += step;
	}
	var bottomIndex = result.AddVertex (new JSM.BodyVertex (JSM.SphericalToCartesian (-radius, 0.0, 0.0)));

	var offset, current, next, top, ntop, polygon;
	for (i = 1; i <= segments; i++) {
		if (i === 1) {
			offset = 1;
			for (j = 0; j < circle; j++) {
				current = offset + j;
				next = current + 1;
				if (j === circle - 1) {
					next = offset;
				}

				polygon = new JSM.BodyPolygon ([current, next, topIndex]);
				if (isCurved) {
					polygon.SetCurveGroup (0);
				}
				result.AddPolygon (polygon);
			}
		} else if (i < segments) {
			offset = (i - 1) * circle + 1;
			for (j = 0; j < circle; j++) {
				current = offset + j;
				next = current + 1;
				top = current - circle;
				ntop = top + 1;

				if (j === circle - 1) {
					next = offset;
					ntop = offset - circle;
				}
				
				polygon = new JSM.BodyPolygon ([current, next, ntop, top]);
				if (isCurved) {
					polygon.SetCurveGroup (0);
				}
				result.AddPolygon (polygon);
			}
		} else if (i === segments) {
			offset = (i - 2) * circle + 1;
			for (j = 0; j < circle; j++) {
				current = offset + j;
				next = current + 1;
				if (j === circle - 1) {
					next = offset;
				}
				
				polygon = new JSM.BodyPolygon ([current, bottomIndex, next]);
				if (isCurved) {
					polygon.SetCurveGroup (0);
				}
				result.AddPolygon (polygon);
			}
		}
	}

	result.SetTextureProjectionType ('Cubic');
	result.SetTextureProjectionCoords (new JSM.CoordSystem (
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0),
		new JSM.Coord (0.0, 0.0, 1.0)
	));

	return result;
};

JSM.GenerateTriangulatedSphere = function (radius, iterations, isCurved)
{
	function GenerateIcosahedron (radius) {
		var result = new JSM.Body ();

		var a = 1.0;
		var b = 0.0;
		var c = (1.0 + Math.sqrt (5.0)) / 2.0;

		JSM.AddVertexToBody (result, +b, +a, +c);
		JSM.AddVertexToBody (result, +b, +a, -c);
		JSM.AddVertexToBody (result, +b, -a, +c);
		JSM.AddVertexToBody (result, +b, -a, -c);

		JSM.AddVertexToBody (result, +a, +c, +b);
		JSM.AddVertexToBody (result, +a, -c, +b);
		JSM.AddVertexToBody (result, -a, +c, +b);
		JSM.AddVertexToBody (result, -a, -c, +b);

		JSM.AddVertexToBody (result, +c, +b, +a);
		JSM.AddVertexToBody (result, -c, +b, +a);
		JSM.AddVertexToBody (result, +c, +b, -a);
		JSM.AddVertexToBody (result, -c, +b, -a);

		JSM.AddPolygonToBody (result, [0, 2, 8]);
		JSM.AddPolygonToBody (result, [0, 4, 6]);
		JSM.AddPolygonToBody (result, [0, 6, 9]);
		JSM.AddPolygonToBody (result, [0, 8, 4]);
		JSM.AddPolygonToBody (result, [0, 9, 2]);
		JSM.AddPolygonToBody (result, [1, 3, 11]);
		JSM.AddPolygonToBody (result, [1, 4, 10]);
		JSM.AddPolygonToBody (result, [1, 6, 4]);
		JSM.AddPolygonToBody (result, [1, 10, 3]);
		JSM.AddPolygonToBody (result, [1, 11, 6]);
		JSM.AddPolygonToBody (result, [2, 5, 8]);
		JSM.AddPolygonToBody (result, [2, 7, 5]);
		JSM.AddPolygonToBody (result, [2, 9, 7]);
		JSM.AddPolygonToBody (result, [3, 5, 7]);
		JSM.AddPolygonToBody (result, [3, 7, 11]);
		JSM.AddPolygonToBody (result, [3, 10, 5]);
		JSM.AddPolygonToBody (result, [4, 8, 10]);
		JSM.AddPolygonToBody (result, [6, 11, 9]);
		JSM.AddPolygonToBody (result, [5, 10, 8]);
		JSM.AddPolygonToBody (result, [7, 9, 11]);

		return result;
	}

	var result = GenerateIcosahedron ();
	
	var currentRadius = JSM.VectorLength (result.GetVertexPosition (0));
	var scale = radius / currentRadius;

	var i, j, vertex;
	for (i = 0; i < result.VertexCount (); i++) {
		vertex = result.GetVertex (i);
		vertex.SetPosition (JSM.VectorMultiply (vertex.GetPosition (), scale));
	}
	
	var iteration, oldVertexCoord, oldBody, adjacencyList;
	var currentEdge, edgeVertexIndices;
	var currentPgon, polygonVertexIndices;
	var midCoord, edgeCoord, currentPolyEdge;
	for (iteration = 0; iteration < iterations; iteration++) {
		oldBody = result;
		
		result = new JSM.Body ();
		adjacencyList = JSM.CalculateAdjacencyList (oldBody);
		for (i = 0; i < adjacencyList.verts.length; i++) {
			oldVertexCoord = oldBody.GetVertexPosition (i);
			JSM.AddVertexToBody (result, oldVertexCoord.x, oldVertexCoord.y, oldVertexCoord.z);
		}
		
		edgeVertexIndices = [];
		for (i = 0; i < adjacencyList.edges.length; i++) {
			currentEdge = adjacencyList.edges[i];
			midCoord = JSM.MidCoord (oldBody.GetVertexPosition (currentEdge.vert1), oldBody.GetVertexPosition (currentEdge.vert2));
			edgeCoord = JSM.VectorMultiply (JSM.VectorNormalize (midCoord), radius);
			edgeVertexIndices.push (result.AddVertex (new JSM.BodyVertex (edgeCoord)));		
		}

		for (i = 0; i < adjacencyList.pgons.length; i++) {
			currentPgon = adjacencyList.pgons[i];
			polygonVertexIndices = [];
			for (j = 0; j < currentPgon.pedges.length; j++) {
				currentPolyEdge = currentPgon.pedges[j];
				polygonVertexIndices.push (JSM.GetPolyEdgeStartVertex (currentPolyEdge, adjacencyList));
				polygonVertexIndices.push (edgeVertexIndices[currentPolyEdge.index]);
			}

			JSM.AddPolygonToBody (result, [polygonVertexIndices[0], polygonVertexIndices[1], polygonVertexIndices[5]]);
			JSM.AddPolygonToBody (result, [polygonVertexIndices[1], polygonVertexIndices[2], polygonVertexIndices[3]]);
			JSM.AddPolygonToBody (result, [polygonVertexIndices[3], polygonVertexIndices[4], polygonVertexIndices[5]]);
			JSM.AddPolygonToBody (result, [polygonVertexIndices[1], polygonVertexIndices[3], polygonVertexIndices[5]]);
		}
	}

	if (isCurved) {
		for (i = 0; i < result.PolygonCount (); i++) {
			result.GetPolygon (i).SetCurveGroup (0);
		}
	}
	
	result.SetTextureProjectionType ('Cubic');
	result.SetTextureProjectionCoords (new JSM.CoordSystem (
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0),
		new JSM.Coord (0.0, 0.0, 1.0)
	));

	return result;
};

JSM.GenerateCylinder = function (radius, height, segmentation, withTopAndBottom, isCurved)
{
	var result = new JSM.Body ();
	var segments = segmentation;

	var theta = 2.0 * Math.PI;
	var step = 2.0 * Math.PI / segments;
	
	var i;
	for (i = 0; i < segments; i++) {
		result.AddVertex (new JSM.BodyVertex (JSM.CylindricalToCartesian (radius, height / 2.0, theta)));
		result.AddVertex (new JSM.BodyVertex (JSM.CylindricalToCartesian (radius, -height / 2.0, theta)));
		theta -= step;
	}

	var current, next, polygon;
	for (i = 0; i < segments; i++) {
		current = 2 * i;
		next = current + 2;
		if (i === segments - 1) {
			next = 0;
		}
		polygon = new JSM.BodyPolygon ([current, next, next + 1, current + 1]);
		if (isCurved) {
			polygon.SetCurveGroup (0);
		}
		result.AddPolygon (polygon);
	}

	if (withTopAndBottom) {
		var topPolygon = new JSM.BodyPolygon ();
		var bottomPolygon = new JSM.BodyPolygon ();
		for (i = 0; i < segments; i++) {
			topPolygon.AddVertexIndex (2 * (segments - i - 1));
			bottomPolygon.AddVertexIndex (2 * i + 1);
		}
		result.AddPolygon (topPolygon);
		result.AddPolygon (bottomPolygon);
	}

	result.SetTextureProjectionType ('Cylindrical');
	result.SetTextureProjectionCoords (new JSM.CoordSystem (
		new JSM.Coord (0.0, 0.0, -(height / 2.0)),
		new JSM.Coord (radius, 0.0, 0.0),
		new JSM.Coord (0.0, radius, 0.0),
		new JSM.Coord (0.0, 0.0, 1.0)
	));

	return result;
};

JSM.GeneratePie = function (radius, height, angle, segmentation, withTopAndBottom, isCurved)
{
	var result = new JSM.Body ();
	var segments = segmentation;

	var theta = angle;
	var step = angle / (segments - 1);
	
	var i;
	result.AddVertex (new JSM.BodyVertex (JSM.CylindricalToCartesian (0.0, height / 2.0, 0.0)));
	result.AddVertex (new JSM.BodyVertex (JSM.CylindricalToCartesian (0.0, -height / 2.0, 0.0)));
	for (i = 0; i < segments; i++) {
		result.AddVertex (new JSM.BodyVertex (JSM.CylindricalToCartesian (radius, height / 2.0, theta)));
		result.AddVertex (new JSM.BodyVertex (JSM.CylindricalToCartesian (radius, -height / 2.0, theta)));
		theta -= step;
	}

	var current, next, polygon;
	for (i = 0; i <= segments; i++) {
		current = 2 * i;
		next = current + 2;
		if (i === segments) {
			next = 0;
		}
		polygon = new JSM.BodyPolygon ([current, next, next + 1, current + 1]);
		if (isCurved && i > 0 && i < segments) {
			polygon.SetCurveGroup (0);
		}
		result.AddPolygon (polygon);
	}

	if (withTopAndBottom) {
		var topPolygon = new JSM.BodyPolygon ();
		var bottomPolygon = new JSM.BodyPolygon ();
		for (i = 0; i <= segments; i++) {
			topPolygon.AddVertexIndex (2 * (segments - i));
			bottomPolygon.AddVertexIndex (2 * i + 1);
		}
		result.AddPolygon (topPolygon);
		result.AddPolygon (bottomPolygon);
	}

	result.SetTextureProjectionType ('Cylindrical');
	result.SetTextureProjectionCoords (new JSM.CoordSystem (
		new JSM.Coord (0.0, 0.0, -(height / 2.0)),
		new JSM.Coord (radius, 0.0, 0.0),
		new JSM.Coord (0.0, radius, 0.0),
		new JSM.Coord (0.0, 0.0, 1.0)
	));

	return result;
};

JSM.GenerateCone = function (topRadius, bottomRadius, height, segmentation, withTopAndBottom, isCurved)
{
	var result = new JSM.Body ();
	var segments = segmentation;

	var topDegenerated = (JSM.IsZero (topRadius));
	var bottomDegenerated = (JSM.IsZero (bottomRadius));

	var theta = 2.0 * Math.PI;
	var step = 2.0 * Math.PI / segments;

	if (topDegenerated) {
		result.AddVertex (new JSM.BodyVertex (JSM.CylindricalToCartesian (0.0, height / 2.0, 0.0)));
	}
	
	var i;
	for (i = 0; i < segments; i++) {
		if (!topDegenerated) {
			result.AddVertex (new JSM.BodyVertex (JSM.CylindricalToCartesian (topRadius, height / 2.0, theta)));
		}
		if (!bottomDegenerated) {
			result.AddVertex (new JSM.BodyVertex (JSM.CylindricalToCartesian (bottomRadius, -height / 2.0, theta)));
		}
		theta -= step;
	}
	if (bottomDegenerated) {
		result.AddVertex (new JSM.BodyVertex (JSM.CylindricalToCartesian (0.0, -height / 2.0, 0.0)));
	}

	var current, next, polygon;
	for (i = 0; i < segments; i++) {
		if (topDegenerated) {
			current = i + 1;
			next = current + 1;
			if (i === segments - 1) {
				next = 1;
			}
			polygon = new JSM.BodyPolygon ([0, next, current]);
			if (isCurved) {
				polygon.SetCurveGroup (0);
			}
			result.AddPolygon (polygon);
		} else if (bottomDegenerated) {
			current = i;
			next = current + 1;
			if (i === segments - 1) {
				next = 0;
			}
			polygon = new JSM.BodyPolygon ([current, next, segments]);
			if (isCurved) {
				polygon.SetCurveGroup (0);
			}
			result.AddPolygon (polygon);
		} else {
			current = 2 * i;
			next = current + 2;
			if (i === segments - 1) {
				next = 0;
			}
			polygon = new JSM.BodyPolygon ([current, next, next + 1, current + 1]);
			if (isCurved) {
				polygon.SetCurveGroup (0);
			}
			result.AddPolygon (polygon);
		}
	}

	var topPolygon, bottomPolygon;
	if (withTopAndBottom) {
		if (topDegenerated) {
			bottomPolygon = new JSM.BodyPolygon ();
			for (i = 0; i < segments; i++) {
				bottomPolygon.AddVertexIndex (i + 1);
			}
			result.AddPolygon (bottomPolygon);
		} else if (bottomDegenerated) {
			topPolygon = new JSM.BodyPolygon ();
			for (i = 0; i < segments; i++) {
				topPolygon.AddVertexIndex (segments - i - 1);
			}
			result.AddPolygon (topPolygon);
		} else {
			topPolygon = new JSM.BodyPolygon ();
			bottomPolygon = new JSM.BodyPolygon ();
			for (i = 0; i < segments; i++) {
				topPolygon.AddVertexIndex (2 * (segments - i - 1));
				bottomPolygon.AddVertexIndex (2 * i + 1);
			}
			result.AddPolygon (topPolygon);
			result.AddPolygon (bottomPolygon);
		}
	}

	var avgRadius = (topRadius + bottomRadius) / 2.0;
	result.SetTextureProjectionType ('Cylindrical');
	result.SetTextureProjectionCoords (new JSM.CoordSystem (
		new JSM.Coord (0.0, 0.0, -(height / 2.0)),
		new JSM.Coord (avgRadius, 0.0, 0.0),
		new JSM.Coord (0.0, avgRadius, 0.0),
		new JSM.Coord (0.0, 0.0, 1.0)
	));

	return result;
};

JSM.GeneratePrism = function (basePolygon, direction, height, withTopAndBottom)
{
	var result = new JSM.Body ();
	var count = basePolygon.length;

	var i;
	for (i = 0; i < count; i++) {
		result.AddVertex (new JSM.BodyVertex (basePolygon[i]));
		result.AddVertex (new JSM.BodyVertex (JSM.CoordOffset (basePolygon[i], direction, height)));
	}

	var current, next;
	for (i = 0; i < count; i++) {
		current = 2 * i;
		next = current + 2;
		if (i === count - 1) {
			next = 0;
		}
		result.AddPolygon (new JSM.BodyPolygon ([current, next, next + 1, current + 1]));
	}

	if (withTopAndBottom) {
		var topPolygon = new JSM.BodyPolygon ();
		var bottomPolygon = new JSM.BodyPolygon ();
		for (i = 0; i < count; i++) {
			topPolygon.AddVertexIndex (2 * i + 1);
			bottomPolygon.AddVertexIndex (2 * (count - i - 1));
		}
		result.AddPolygon (topPolygon);
		result.AddPolygon (bottomPolygon);
	}

	var firstDirection = JSM.VectorNormalize (JSM.CoordSub (basePolygon[1], basePolygon[0]));
	var origo = new JSM.Coord (basePolygon[0].x, basePolygon[0].y, basePolygon[0].z);
	var e3 = JSM.VectorNormalize (direction);
	var e2 = JSM.VectorCross (e3, firstDirection);
	var e1 = JSM.VectorCross (e2, e3);

	result.SetTextureProjectionType ('Cubic');
	result.SetTextureProjectionCoords (new JSM.CoordSystem (
		origo,
		e1,
		e2,
		e3
	));

	return result;
};

JSM.GenerateCurvedPrism = function (basePolygon, curveGroups, direction, height, withTopAndBottom)
{
	var result = JSM.GeneratePrism (basePolygon, direction, height, withTopAndBottom);
	if (curveGroups === undefined || curveGroups === null) {
		return result;
	}
	
	if (basePolygon.length != curveGroups.length) {
		return result;
	}
	
	var i, current;
	for (i = 0; i < basePolygon.length; i++) {
		current = curveGroups[i];
		result.GetPolygon (i).SetCurveGroup (current);
	}
	return result;
};

JSM.GeneratePrismWithHole = function (basePolygon, direction, height, withTopAndBottom)
{
	function AddVertices ()
	{
		var i;
		for (i = 0; i < basePolygon.length; i++) {
			if (basePolygon[i] !== null) {
				result.AddVertex (new JSM.BodyVertex (basePolygon[i]));
				result.AddVertex (new JSM.BodyVertex (JSM.CoordOffset (basePolygon[i], direction, height)));
			}
		}			
	}

	function GetContourEnds (contourIndex)
	{
		var contourCount = 0;
		var contourEnds = [];
		contourEnds.push (0);
	
		var i;
		for (i = 0; i < basePolygon.length; i++) {
			if (basePolygon[i] === null) {
				contourEnds.push (i - contourCount);
				contourCount = contourCount + 1;
			}
		}
		contourEnds.push (i - contourCount);
		return contourEnds;
	}

	function AddContourPolygons (contourIndex, contourEnds)
	{
		var i, current, next;
		var from = contourEnds[contourIndex];
		var to = contourEnds[contourIndex + 1];
		for (i = from; i < to; i++) {
			current = 2 * i;
			next = current + 2;
			if (i === to - 1) {
				next = 2 * from;
			}
			result.AddPolygon (new JSM.BodyPolygon ([current, next, next + 1, current + 1]));
		}
	}

	function AddContours ()
	{
		var contourEnds = GetContourEnds ();
		var i;
		for (i = 0; i < contourEnds.length - 1; i++) {
			AddContourPolygons (i, contourEnds);
		}	
	}
	
	function GetVertexMap ()
	{
		var contourCount = 0;
		var vertexMap = [];
	
		var i;
		for (i = 0; i < basePolygon.length; i++) {
			if (basePolygon[i] === null) {
				contourCount = contourCount + 1;
			}
			vertexMap.push (i - contourCount);
		}
		return vertexMap;
	}

	function AddTopBottomPolygons ()
	{
		var vertexMap = GetVertexMap ();

		var polygonIndices = JSM.CreatePolygonWithHole (basePolygon);
		var polygon = new JSM.Polygon ();
		var i, j, vertex;
		for (i = 0; i < polygonIndices.length; i++) {
			vertex = basePolygon[polygonIndices[i]];
			polygon.AddVertex (vertex.x, vertex.y, vertex.z);
		}
		var triangles = JSM.PolygonTriangulate (polygon);

		var triangle, topTriangle, bottomTriangle;
		for (i = 0; i < triangles.length; i++) {
			triangle = triangles[i];
			topTriangle = new JSM.BodyPolygon ();
			bottomTriangle = new JSM.BodyPolygon ();
			for (j = 0; j < 3; j++) {
				topTriangle.AddVertexIndex (2 * vertexMap[polygonIndices[triangle[j]]] + 1);
				bottomTriangle.AddVertexIndex (2 * vertexMap[polygonIndices[triangle[3 - j - 1]]]);
			}
			result.AddPolygon (topTriangle);
			result.AddPolygon (bottomTriangle);
		}
	}

	var result = new JSM.Body ();
	AddVertices ();
	AddContours ();

	if (withTopAndBottom) {
		AddTopBottomPolygons ();
	}

	var firstDirection = JSM.VectorNormalize (JSM.CoordSub (basePolygon[1], basePolygon[0]));
	var origo = new JSM.Coord (basePolygon[0].x, basePolygon[0].y, basePolygon[0].z);
	var e3 = JSM.VectorNormalize (direction);
	var e2 = JSM.VectorCross (e3, firstDirection);
	var e1 = JSM.VectorCross (e2, e3);

	result.SetTextureProjectionType ('Cubic');
	result.SetTextureProjectionCoords (new JSM.CoordSystem (
		origo,
		e1,
		e2,
		e3
	));

	return result;
};

JSM.GenerateCurvedPrismWithHole = function (basePolygon, curveGroups, direction, height, withTopAndBottom)
{
	var result = JSM.GeneratePrismWithHole (basePolygon, direction, height, withTopAndBottom);
	if (curveGroups === undefined || curveGroups === null) {
		return result;
	}
	
	if (basePolygon.length != curveGroups.length) {
		return result;
	}
	
	var index = 0;
	var i, current;
	for (i = 0; i < basePolygon.length; i++) {
		current = curveGroups[i];
		if (current === null) {
			continue;
		}
		result.GetPolygon (index).SetCurveGroup (current);
		index++;
	}
	return result;
};

JSM.GeneratePrismShell = function (basePolygon, direction, height, width, withTopAndBottom)
{
	var result = new JSM.Body ();
	var count = basePolygon.length;

	var i;
	for (i = 0; i < count; i++) {
		result.AddVertex (new JSM.BodyVertex (basePolygon[i]));
	}

	var polygon = new JSM.Polygon ();
	polygon.vertices = basePolygon;
	var innerBasePolygon = JSM.OffsetPolygonContour (polygon, width).vertices;
	for (i = 0; i < count; i++) {
		result.AddVertex (new JSM.BodyVertex (innerBasePolygon[i]));
	}

	var offseted;
	for (i = 0; i < count; i++) {
		offseted = JSM.CoordOffset (basePolygon[i], direction, height);
		result.AddVertex (new JSM.BodyVertex (offseted));
	}

	for (i = 0; i < count; i++) {
		offseted = JSM.CoordOffset (innerBasePolygon[i], direction, height);
		result.AddVertex (new JSM.BodyVertex (offseted));
	}

	var curr, next, top, ntop;
	for (i = 0; i < count; i++) {
		curr = i;
		next = curr + 1;
		top = curr + 2 * count;
		ntop = top + 1;
		if (i === count - 1) {
			next = 0;
			ntop = 2 * count;
		}
		result.AddPolygon (new JSM.BodyPolygon ([curr, next, ntop, top]));
		result.AddPolygon (new JSM.BodyPolygon ([curr + count, top + count, ntop + count, next + count]));
	}

	if (withTopAndBottom) {
		for (i = 0; i < count; i++) {
			curr = i;
			next = curr + 1;
			top = i + count;
			ntop = top + 1;
			if (i === count - 1) {
				next = 0;
				ntop = count;
			}
			result.AddPolygon (new JSM.BodyPolygon ([curr, top, ntop, next]));
			result.AddPolygon (new JSM.BodyPolygon ([curr + 2 * count, next + 2 * count, ntop + 2 * count, top + 2 * count]));
		}
	}

	var firstDirection = JSM.VectorNormalize (JSM.CoordSub (basePolygon[1], basePolygon[0]));
	var origo = new JSM.Coord (basePolygon[0].x, basePolygon[0].y, basePolygon[0].z);
	var e3 = JSM.VectorNormalize (direction);
	var e2 = JSM.VectorCross (e3, firstDirection);
	var e1 = JSM.VectorCross (e2, e3);

	result.SetTextureProjectionType ('Cubic');
	result.SetTextureProjectionCoords (new JSM.CoordSystem (
		origo,
		e1,
		e2,
		e3
	));

	return result;
};

JSM.GenerateCylinderShell = function (radius, height, width, segmentation, withTopAndBottom, isCurved)
{
	function GenerateCircle (radius, segmentation, bottom)
	{
		var result = [];
		var step = 2.0 * Math.PI / segmentation;
		var theta, cartesian;
		var i = 0;
		for (i = 0; i < segmentation; i++) {
			theta = i * step;
			cartesian = JSM.PolarToCartesian (radius, theta);
			result.push (new JSM.Coord (cartesian.x, cartesian.y, bottom));
		}
		return result;
	}

	var normal = new JSM.Vector (0.0, 0.0, 1.0);
	var circle = GenerateCircle (radius, segmentation, -height / 2.0);
	var result = JSM.GeneratePrismShell (circle, normal, height, width, withTopAndBottom);
	
	var i;
	if (isCurved) {
		for (i = 0; i < segmentation; i++) {
			result.GetPolygon (2 * i).SetCurveGroup (0);
			result.GetPolygon (2 * i + 1).SetCurveGroup (0);
		}
	}
	
	return result;
};

JSM.GenerateLineShell = function (basePolyLine, direction, height, width, withStartAndEnd, withTopAndBottom)
{
	var result = new JSM.Body ();
	var count = basePolyLine.length;

	var angles = [];
	
	var i, prev, curr, next;
	var prevDir, nextDir, angle;
	for (i = 0; i < count; i++) {
		if (i === 0 || i === count - 1) {
			angle = Math.PI / 2.0;
		} else {
			prev = i - 1;
			curr = i;
			next = i + 1;

			nextDir = JSM.CoordSub (basePolyLine[next], basePolyLine[curr]);
			prevDir = JSM.CoordSub (basePolyLine[prev], basePolyLine[curr]);
			angle = JSM.GetVectorsAngle (nextDir, prevDir) / 2.0;
			if (JSM.CoordTurnType (basePolyLine[prev], basePolyLine[curr], basePolyLine[next], direction) === 'Clockwise') {
				angle = Math.PI - angle;
			}
		}
		
		angles.push (angle);
	}

	var innerBasePolyLine = [];
	var distance, innerCoord, offsetDirection;
	for (i = 0; i < count; i++) {
		curr = i;
		if (i === count - 1) {
			offsetDirection = JSM.CoordSub (basePolyLine[curr - 1], basePolyLine[curr]);
		} else {
			next = (i + 1) % count;
			offsetDirection = JSM.CoordSub (basePolyLine[curr], basePolyLine[next]);
		}

		angle = angles[curr];
		distance = width / Math.sin (angle);
		innerCoord = JSM.CoordOffset (basePolyLine[curr], offsetDirection, distance);
		innerCoord = JSM.CoordRotate (innerCoord, direction, -(Math.PI - angle), basePolyLine[curr]);
		innerBasePolyLine.push (innerCoord);
	}

	for (i = 0; i < count; i++) {
		result.AddVertex (new JSM.BodyVertex (basePolyLine[i]));
	}

	for (i = 0; i < count; i++) {
		result.AddVertex (new JSM.BodyVertex (innerBasePolyLine[i]));
	}

	var offseted;
	for (i = 0; i < count; i++) {
		offseted = JSM.CoordOffset (basePolyLine[i], direction, height);
		result.AddVertex (new JSM.BodyVertex (offseted));
	}

	for (i = 0; i < count; i++) {
		offseted = JSM.CoordOffset (innerBasePolyLine[i], direction, height);
		result.AddVertex (new JSM.BodyVertex (offseted));
	}

	var top, ntop;
	for (i = 0; i < count - 1; i++) {
		curr = i;
		next = curr + 1;
		top = curr + 2 * count;
		ntop = top + 1;
		result.AddPolygon (new JSM.BodyPolygon ([curr, next, ntop, top]));
		result.AddPolygon (new JSM.BodyPolygon ([curr + count, top + count, ntop + count, next + count]));
	}

	if (withStartAndEnd) {
		curr = 0;
		next = curr + count;
		top = curr + 2 * count;
		ntop = curr + 3 * count;
		result.AddPolygon (new JSM.BodyPolygon ([curr, top, ntop, next]));

		curr = count - 1;
		next = curr + count;
		top = curr + 2 * count;
		ntop = curr + 3 * count;
		result.AddPolygon (new JSM.BodyPolygon ([curr, next, ntop, top]));
	}

	if (withTopAndBottom) {
		for (i = 0; i < count - 1; i++) {
			curr = i;
			next = curr + 1;
			top = i + count;
			ntop = top + 1;
			result.AddPolygon (new JSM.BodyPolygon ([curr, top, ntop, next]));
			result.AddPolygon (new JSM.BodyPolygon ([curr + 2 * count, next + 2 * count, ntop + 2 * count, top + 2 * count]));
		}
	}

	var firstDirection = JSM.VectorNormalize (JSM.CoordSub (basePolyLine[1], basePolyLine[0]));
	var origo = new JSM.Coord (basePolyLine[0].x, basePolyLine[0].y, basePolyLine[0].z);
	var e3 = JSM.VectorNormalize (direction);
	var e2 = JSM.VectorCross (e3, firstDirection);
	var e1 = JSM.VectorCross (e2, e3);

	result.SetTextureProjectionType ('Cubic');
	result.SetTextureProjectionCoords (new JSM.CoordSystem (
		origo,
		e1,
		e2,
		e3
	));

	return result;
};

JSM.GenerateTorus = function (outerRadius, innerRadius, outerSegmentation, innerSegmentation, isCurved)
{
	var result = new JSM.Body ();
	
	var theta = 2.0 * Math.PI;
	var step = 2.0 * Math.PI / innerSegmentation;
	
	var circle = [];
	
	var i, coord2D, coord;
	for (i = 0; i < innerSegmentation; i++) {
		coord2D = JSM.PolarToCartesian (innerRadius, theta);
		coord = new JSM.Coord (coord2D.x + outerRadius, 0.0, coord2D.y);
		circle.push (coord);
		theta -= step;
	}

	var axisDir = new JSM.Coord (0.0, 0.0, 1.0);
	var origo = new JSM.Coord (0.0, 0.0, 0.0);
	
	step = (2.0 * Math.PI) / outerSegmentation;
	var j, rotated;
	for (i = 0; i < outerSegmentation; i++) {
		for (j = 0; j < innerSegmentation; j++) {
			rotated = JSM.CoordRotate (circle[j], axisDir, i * step, origo);
			result.AddVertex (new JSM.BodyVertex (rotated));
		}
	}

	var polygon, current, top, next, ntop;
	for (i = 0; i < outerSegmentation; i++) {
		polygon = new JSM.BodyPolygon ();
		for (j = 0; j < innerSegmentation; j++) {
			current = i * innerSegmentation + j;
			next = current + innerSegmentation;
			top = current + 1;
			ntop = next + 1;
			
			if (j === innerSegmentation - 1) {
				top = (i * innerSegmentation);
				ntop = (i + 1) * innerSegmentation;
			}

			if (i === outerSegmentation - 1) {
				next = j;
				ntop = j + 1;
				if (j === innerSegmentation - 1) {
					ntop = 0;
				}
			}

			polygon = new JSM.BodyPolygon ([current, next, ntop, top]);
			if (isCurved) {
				polygon.SetCurveGroup (0);
			}
			result.AddPolygon (polygon);
		}
	}
	
	result.SetTextureProjectionType ('Cubic');
	result.SetTextureProjectionCoords (new JSM.CoordSystem (
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0),
		new JSM.Coord (0.0, 0.0, 1.0)
	));

	return result;
};

JSM.GeneratePolyTorus = function (basePolygon, outerRadius, outerSegmentation, isCurved)
{
	var result = new JSM.Body ();
	
	var innerSegmentation = basePolygon.length;
	var theta = 2.0 * Math.PI;
	var step = 2.0 * Math.PI / innerSegmentation;
	
	var circle = [];
	
	var i, coord2D, coord;
	for (i = 0; i < innerSegmentation; i++) {
		coord2D = basePolygon[i];
		coord = new JSM.Coord (coord2D.x + outerRadius, 0.0, coord2D.y);
		circle.push (coord);
		theta -= step;
	}

	var axisDir = new JSM.Coord (0.0, 0.0, 1.0);
	var origo = new JSM.Coord (0.0, 0.0, 0.0);
	
	step = (2.0 * Math.PI) / outerSegmentation;
	var j, rotated;
	for (i = 0; i < outerSegmentation; i++) {
		for (j = 0; j < innerSegmentation; j++) {
			rotated = JSM.CoordRotate (circle[j], axisDir, i * step, origo);
			result.AddVertex (new JSM.BodyVertex (rotated));
		}
	}

	var polygon, current, top, next, ntop;
	for (i = 0; i < outerSegmentation; i++) {
		polygon = new JSM.BodyPolygon ();
		for (j = 0; j < innerSegmentation; j++) {
			current = i * innerSegmentation + j;
			next = current + innerSegmentation;
			top = current + 1;
			ntop = next + 1;
			
			if (j === innerSegmentation - 1) {
				top = (i * innerSegmentation);
				ntop = (i + 1) * innerSegmentation;
			}

			if (i === outerSegmentation - 1) {
				next = j;
				ntop = j + 1;
				if (j === innerSegmentation - 1) {
					ntop = 0;
				}
			}

			polygon = new JSM.BodyPolygon ([current, next, ntop, top]);
			if (isCurved) {
				polygon.SetCurveGroup (j);
			}
			result.AddPolygon (polygon);
		}
	}
	
	result.SetTextureProjectionType ('Cubic');
	result.SetTextureProjectionCoords (new JSM.CoordSystem (
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0),
		new JSM.Coord (0.0, 0.0, 1.0)
	));

	return result;
};

JSM.GetLineSegmentation = function (begin, end, segmentation, coords)
{
	var direction = JSM.CoordSub (end, begin);
	var length = JSM.CoordDistance (begin, end);
	var step = length / segmentation;
	var distance = 0.0;

	var i;
	for (i = 0; i <= segmentation; i++) {
		coords.push (JSM.CoordOffset (begin, direction, distance));
		distance += step;
	}
};

JSM.GetRuledMesh = function (aCoords, bCoords, segmentation, vertices, polygons)
{
	if (aCoords.length !== bCoords.length) {
		return;
	}

	var lineSegmentation = aCoords.length - 1;
	var meshSegmentation = segmentation;
	var directions = [];
	var lengths = [];

	var i, j;
	for (i = 0; i <= lineSegmentation; i++) {
		directions.push (JSM.CoordSub (bCoords[i], aCoords[i]));
		lengths.push (JSM.CoordDistance (aCoords[i], bCoords[i]));
	}

	var step, coord;
	for (i = 0; i <= lineSegmentation; i++) {
		step = lengths[i] / meshSegmentation;
		for (j = 0; j <= meshSegmentation; j++) {
			coord = JSM.CoordOffset (aCoords[i], directions[i], step * j);
			vertices.push (coord);
		}
	}

	var current, top, next, ntop, polygon;
	for (i = 0; i < lineSegmentation; i++) {
		for (j = 0; j < meshSegmentation; j++) {
			current = i * (meshSegmentation + 1) + j;
			top = current + meshSegmentation + 1;
			next = current + 1;
			ntop = top + 1;

			current = i * (meshSegmentation + 1) + j;
			top = current + 1;
			next = current + meshSegmentation + 1;
			ntop = next + 1;

			polygon = [current, next, ntop, top];
			polygons.push (polygon);
		}
	}
};

JSM.GenerateRuledFromSectors = function (aSector, bSector, lineSegmentation, meshSegmentation, isCurved)
{
	var result = new JSM.Body ();

	var aCoords = [];
	var bCoords = [];
	JSM.GetLineSegmentation (aSector.beg, aSector.end, lineSegmentation, aCoords);
	JSM.GetLineSegmentation (bSector.beg, bSector.end, lineSegmentation, bCoords);

	var vertices = [];
	var polygons = [];
	JSM.GetRuledMesh (aCoords, bCoords, meshSegmentation, vertices, polygons);

	var i;
	for (i = 0; i < vertices.length; i++) {
		result.AddVertex (new JSM.BodyVertex (vertices[i]));
	}

	var polygon, polygonVertexIndices;
	for (i = 0; i < polygons.length; i++) {
		polygonVertexIndices = polygons[i];
		polygon = new JSM.BodyPolygon (polygonVertexIndices);
		if (isCurved) {
			polygon.SetCurveGroup (0);
		}
		result.AddPolygon (polygon);
	}

	result.SetTextureProjectionType ('Cubic');
	result.SetTextureProjectionCoords (new JSM.CoordSystem (
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0),
		new JSM.Coord (0.0, 0.0, 1.0)
	));

	return result;
};

JSM.GenerateGrid = function (xSize, ySize, xSegmentation, ySegmentation, curved)
{
	var xSector = new JSM.Sector (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (xSize, 0.0, 0.0));
	var ySector = new JSM.Sector (new JSM.Coord (0.0, ySize, 0.0), new JSM.Coord (xSize, ySize, 0.0));
	return JSM.GenerateRuledFromSectors (xSector, ySector, xSegmentation, ySegmentation, curved);
};

JSM.GenerateQuadGrid = function (size, segmentation, curved)
{
	return JSM.GenerateGrid (size, size, segmentation, segmentation, curved);
};

JSM.GenerateRuledFromSectorsWithHeight = function (aSector, bSector, lineSegmentation, meshSegmentation, isCurved, height)
{
	var result = new JSM.Body ();

	var aCoords = [];
	var bCoords = [];
	JSM.GetLineSegmentation (aSector.beg, aSector.end, lineSegmentation, aCoords);
	JSM.GetLineSegmentation (bSector.beg, bSector.end, lineSegmentation, bCoords);

	var vertices = [];
	var polygons = [];
	JSM.GetRuledMesh (aCoords, bCoords, meshSegmentation, vertices, polygons);

	var i;
	for (i = 0; i < vertices.length; i++) {
		result.AddVertex (new JSM.BodyVertex (vertices[i]));
	}

	var polygon, polygonVertexIndices;
	for (i = 0; i < polygons.length; i++) {
		polygonVertexIndices = polygons[i];
		polygon = new JSM.BodyPolygon (polygonVertexIndices);
		if (isCurved) {
			polygon.SetCurveGroup (0);
		}
		result.AddPolygon (polygon);
	}
	
	var topVertexCount = result.VertexCount ();

	var newVertex, vertex;
	for (i = 0; i < vertices.length; i++) {
		vertex = vertices[i];
		newVertex = new JSM.Coord (vertex.x, vertex.y, vertex.z);
		newVertex.z -= height;
		result.AddVertex (new JSM.BodyVertex (newVertex));
	}

	var j, newpolygonVertexIndices;
	for (i = 0; i < polygons.length; i++) {
		polygonVertexIndices = polygons[i];
		newpolygonVertexIndices = [];
		for (j = polygonVertexIndices.length - 1; j >= 0; j--) {
			newpolygonVertexIndices.push (polygonVertexIndices[j] + topVertexCount);
		}
		polygon = new JSM.BodyPolygon (newpolygonVertexIndices);
		if (isCurved) {
			polygon.SetCurveGroup (0);
		}
		result.AddPolygon (polygon);
	}

	var current, next, top, ntop;
	
	for (i = 0; i < meshSegmentation; i++) {
		current = i + topVertexCount;
		next = current + 1;
		top = current - topVertexCount;
		ntop = top + 1;
		polygon = new JSM.BodyPolygon ([current, next, ntop, top]);
		result.AddPolygon (polygon);
	}

	for (i = 0; i < meshSegmentation; i++) {
		current = i + (lineSegmentation * (meshSegmentation + 1)) + topVertexCount;
		next = current + 1;
		top = current - topVertexCount;
		ntop = top + 1;
		polygon = new JSM.BodyPolygon ([current, top, ntop, next]);
		result.AddPolygon (polygon);
	}

	for (i = 0; i < lineSegmentation; i++) {
		current = i * (meshSegmentation + 1) + topVertexCount;
		next = current + meshSegmentation + 1;
		top = current - topVertexCount;
		ntop = top + meshSegmentation + 1;
		polygon = new JSM.BodyPolygon ([current, top, ntop, next]);
		result.AddPolygon (polygon);
	}

	for (i = 0; i < lineSegmentation; i++) {
		current = (i + 1) * meshSegmentation + i + topVertexCount;
		next = current + meshSegmentation + 1;
		top = current - topVertexCount;
		ntop = top + meshSegmentation + 1;
		polygon = new JSM.BodyPolygon ([current, next, ntop, top]);
		result.AddPolygon (polygon);
	}

	result.SetTextureProjectionType ('Cubic');
	result.SetTextureProjectionCoords (new JSM.CoordSystem (
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0),
		new JSM.Coord (0.0, 0.0, 1.0)
	));

	return result;
};

JSM.GenerateRuledFromCoords = function (aCoords, bCoords, meshSegmentation, isCurved)
{
	var result = new JSM.Body ();
	var vertices = [];
	var polygons = [];

	JSM.GetRuledMesh (aCoords, bCoords, meshSegmentation, vertices, polygons);

	var i;
	for (i = 0; i < vertices.length; i++) {
		result.AddVertex (new JSM.BodyVertex (vertices[i]));
	}

	var polygon;
	for (i = 0; i < polygons.length; i++) {
		vertices = polygons[i];
		polygon = new JSM.BodyPolygon (vertices);
		if (isCurved) {
			polygon.SetCurveGroup (0);
		}
		result.AddPolygon (polygon);
	}

	result.SetTextureProjectionType ('Cubic');
	result.SetTextureProjectionCoords (new JSM.CoordSystem (
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0),
		new JSM.Coord (0.0, 0.0, 1.0)
	));

	return result;
};

JSM.GenerateRevolved = function (polyLine, axis, angle, segmentation, withTopAndBottom, isCurved)
{
	var result = new JSM.Body ();
	var circular = JSM.IsEqual (angle, 2.0 * Math.PI);

	var count = polyLine.length;
	var step = angle / segmentation;
	var axisDir = JSM.CoordSub (axis.end, axis.beg);
	
	var i, j, rotated;
	for (i = 0; i < count; i++) {
		for (j = 0; j <= segmentation; j++) {
			if (circular && j === segmentation) {
				continue;
			}

			rotated = JSM.CoordRotate (polyLine[i], axisDir, j * step, axis.beg);
			result.AddVertex (new JSM.BodyVertex (rotated));
		}
	}

	var current, top, next, ntop, polygon;
	for (i = 0; i < count - 1; i++) {
		for (j = 0; j < segmentation; j++) {
			current = i * (segmentation + 1) + j;
			top = current + segmentation + 1;
			next = current + 1;
			ntop = top + 1;

			if (circular) {
				current = i * segmentation + j;
				top = current + segmentation;
				next = current + 1;
				ntop = top + 1;
				if (j === segmentation - 1) {
					next = i * segmentation;
					ntop = (i + 1) * segmentation;
				}
			}

			polygon = new JSM.BodyPolygon ([current, next, ntop, top]);
			if (isCurved) {
				polygon.SetCurveGroup (i);
			}
			result.AddPolygon (polygon);
		}
	}

	if (circular && withTopAndBottom) {
		var topPolygon = new JSM.BodyPolygon ();
		var bottomPolygon = new JSM.BodyPolygon ();
		for (i = 0; i < segmentation; i++) {
			topPolygon.AddVertexIndex (segmentation * (count - 1) + i);
			bottomPolygon.AddVertexIndex (segmentation - i - 1);
		}
		result.AddPolygon (topPolygon);
		result.AddPolygon (bottomPolygon);
	}

	var axisLine = new JSM.Line (axis.beg, JSM.VectorNormalize (axisDir));
	var avgRadius = 0.0;
	var projected;
	for (i = 0; i < count; i++) {
		projected = JSM.ProjectCoordToLine (polyLine[i], axisLine);
		avgRadius = avgRadius + JSM.CoordDistance (projected, polyLine[i]);
	}
	avgRadius = avgRadius / count;
	
	var origo = new JSM.Coord (axis.beg.x, axis.beg.y, axis.beg.z);
	var e3 = JSM.VectorNormalize (axisDir);
	var baseLine = new JSM.Line (origo, axisDir);
	var projectedToBaseLine = JSM.ProjectCoordToLine (polyLine[0], baseLine);
	var e1 = JSM.VectorSetLength (JSM.CoordSub (polyLine[0], projectedToBaseLine), avgRadius);
	var e2 = JSM.VectorSetLength (JSM.VectorCross (e3, e1), avgRadius);
	
	result.SetTextureProjectionType ('Cylindrical');
	result.SetTextureProjectionCoords (new JSM.CoordSystem (
		origo,
		e1,
		e2,
		e3
	));

	return result;
};

JSM.GenerateFunctionSurface = function (function3D, intervalMin, intervalMax, segmentation, isCurved)
{
	var aSector = new JSM.Sector (new JSM.Coord (intervalMin.x, intervalMin.y, 0.0), new JSM.Coord (intervalMax.x, intervalMin.y, 0.0));
	var bSector = new JSM.Sector (new JSM.Coord (intervalMin.x, intervalMax.y, 0.0), new JSM.Coord (intervalMax.x, intervalMax.y, 0.0));
	var result = JSM.GenerateRuledFromSectors (aSector, bSector, segmentation, segmentation, isCurved);

	var i, coord, functionValue;
	for (i = 0; i < result.VertexCount (); i++) {
		coord = result.GetVertexPosition (i);
		coord.z = function3D (coord.x, coord.y);
	}

	result.SetTextureProjectionType ('Cubic');
	result.SetTextureProjectionCoords (new JSM.CoordSystem (
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0),
		new JSM.Coord (0.0, 0.0, 1.0)
	));

	return result;
};

JSM.GenerateFunctionSurfaceSolid = function (function3D, intervalMin, intervalMax, segmentation, isCurved, bottomZ)
{
	var aSector = new JSM.Sector (new JSM.Coord (intervalMax.x, intervalMin.y, 0.0), new JSM.Coord (intervalMin.x, intervalMin.y, 0.0));
	var bSector = new JSM.Sector (new JSM.Coord (intervalMax.x, intervalMax.y, 0.0), new JSM.Coord (intervalMin.x, intervalMax.y, 0.0));
	var result = JSM.GenerateRuledFromSectorsWithHeight (aSector, bSector, segmentation, segmentation, isCurved, bottomZ);

	var i, coord, functionValue;
	var topVertexCount = (segmentation + 1) * (segmentation + 1);
	for (i = 0; i < topVertexCount; i++) {
		coord = result.GetVertexPosition (i);
		coord.z = function3D (coord.x, coord.y);
	}

	result.SetTextureProjectionType ('Cubic');
	result.SetTextureProjectionCoords (new JSM.CoordSystem (
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0),
		new JSM.Coord (0.0, 0.0, 1.0)
	));

	return result;
};

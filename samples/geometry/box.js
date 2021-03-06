'use strict';


var Box = function(gl) {

    this.drawMode = gl.TRIANGLES;

    // -- Local space position

    //    6 --- 5
    //  2 --- 3 |
    //  | |   | |
    //  | 7 --|-4
    //  1 --- 0 
    //
    this.positions = new Float32Array([
      // Front face
      -1.0, -1.0,  1.0,
       1.0, -1.0,  1.0,
       1.0,  1.0,  1.0,
      -1.0,  1.0,  1.0,

      // Back face
      -1.0, -1.0, -1.0,
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0, -1.0, -1.0,

      // Top face
      -1.0,  1.0, -1.0,
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
       1.0,  1.0, -1.0,

      // Bottom face
      -1.0, -1.0, -1.0,
       1.0, -1.0, -1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0,

      // Right face
       1.0, -1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0,  1.0,  1.0,
       1.0, -1.0,  1.0,

      // Left face
      -1.0, -1.0, -1.0,
      -1.0, -1.0,  1.0,
      -1.0,  1.0,  1.0,
      -1.0,  1.0, -1.0
    ]);

    // @todo: fill up
    this.normals = new Float32Array([

    ]);

    // @todo: doesn't have to be 32-bit
    this.colors = new Float32Array([

    ]);

    // @todo: fill up
    this.texcoords = new Float32Array([

    ]);

    this.indices = new Uint16Array([
        0,  1,  2,      0,  2,  3,    // front
        4,  5,  6,      4,  6,  7,    // back
        8,  9,  10,     8,  10, 11,   // top
        12, 13, 14,     12, 14, 15,   // bottom
        16, 17, 18,     16, 18, 19,   // right
        20, 21, 22,     20, 22, 23    // left
    ]);

    this.indicesWireframe = new Uint16Array([
        0, 1, 1, 2, 2, 3, 3, 0,       // front
        4, 5, 5, 6, 6, 7, 7, 4,       // back
        3, 5, 2, 6, 0, 4, 1, 7        // side     
    ]);

    this.getIdxCount = function() {
        switch (this.drawMode)
        {
          case gl.LINES:
            return this.indicesWireframe.length;
          case gl.TRIANGLES:
            return this.indices.length;
          default:
            return -1;
        }
    }

    // -- GL Buffers

    this.posBuffer = gl.createBuffer();
    this.norBuffer = gl.createBuffer();
    this.idxBuffer = gl.createBuffer();


    // -- TRANSFORMATIONS

    this.model = mat4.create();

    this.translate = function(newPosition) {

    }

    this.rotate = function(radx, rady, radz) {
        mat4.rotateX(this.model, this.model, radx * Math.PI);
        mat4.rotateY(this.model, this.model, rady * Math.PI);
        mat4.rotateZ(this.model, this.model, radz * Math.PI);
    }

    // -- FUNCTIONS


    // -- Create function. Must call during intialization
    this.create = function(gl, drawMode = gl.TRIANGLES) {

        this.drawMode = drawMode;

        // Position buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.positions, gl.STATIC_DRAW);

        // @todo: fill up data for normals, texcoord, and colors

        // Element buffer
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.idxBuffer);

        switch (this.drawMode)
        {
          case gl.LINES:
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indicesWireframe, gl.STATIC_DRAW);
            break;
          case gl.TRIANGLES:
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
            break;
        }
        

    }
}
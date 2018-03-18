'use strict';


var Points = function(gl, positions) {

    this.drawMode = gl.POINTS;

    this.vertexData = new Float32Array([0,0,0]);
    this.positions = positions;

    this.normals = new Float32Array([

    ]);

    this.colors = new Float32Array([

    ]);

    // -- GL Buffers

    this.posBuffer = gl.createBuffer();
    this.norBuffer = gl.createBuffer();
    this.vertexBuffer = gl.createBuffer();


    // -- TRANSFORMATIONS

    this.model = mat4.create();

    this.translate = function(newPosition) {

    }

    // -- Create function. Must call during intialization
    this.create = function(gl) {

        // Position buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertexData, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.positions, gl.STREAM_DRAW); // Buffer orphaning, a common way to improve streaming perf. See above link for details.
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.positions.length, this.positions);

    }
}
﻿/**
* Copyright (c) 2013, Ken Anderson <caffeinatedrat at gmail dot com>
* All rights reserved.
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
*     * Redistributions of source code must retain the above copyright
*       notice, this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in the
*       documentation and/or other materials provided with the distribution.
*
* THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE AUTHOR AND CONTRIBUTORS BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/*
* -----------------------------------------------------------------
* Required Libraries:
* 1) Three.js
* -----------------------------------------------------------------
*/

//-----------------------------------------------------------------
// Blocks
//-----------------------------------------------------------------

/**
* @constructor
*/
CaffeinatedRat.Minecraft.Spectator.Block = function (parameters) {

    //-----------------------------------------------------------------
    // Parameterization
    //-----------------------------------------------------------------

    parameters = parameters || {};

    if (parameters.texture !== undefined) {

        //This must be a Three.Texture
        if (parameters.texture instanceof THREE.Texture) {

            this._texture = parameters.texture;
        }
        else {

            throw new CaffeinatedRat.Minecraft.Spectator.InvalidTexture('constructor');

        }

    }
    else {

        this._texture = null;

    }

    if (parameters.sides !== undefined) {

        this._sides = parameters.sides;

    }
    else {

        //Unknown sides, render it as a block of dirt.
        this._sides = [];
        this._sides['sides'] = new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(3, 16);

    }

    if (parameters.opaquesides !== undefined) {

        this._opaquesides = parameters.opaquesides;

    }
    else {

        //Unknown sides, render it as a block of dirt.
        this._opaquesides = null;

    }

    if (parameters.transparent !== undefined) {

        this._transparent = parameters.transparent;

    }
    else {

        this._transparent = false;

    }

    this._blockMesh = null;

}

CaffeinatedRat.Minecraft.Spectator.Block.prototype.init = function (scene, supportTransparency) {

    if (scene !== undefined) {

        //This must be a Three.Texture
        if (scene instanceof THREE.Scene) {

            this._scene = scene;
        }
        else {

            throw new CaffeinatedRat.Minecraft.Spectator.SceneNotDefinedException('constructor');

        }

    }
    else {

        throw new CaffeinatedRat.Minecraft.Spectator.SceneNotDefinedException('constructor');

    }
    //END OF if (scene !== undefined) {...

    var transparent = this._transparent;
    if (transparent === undefined) {

        transparent = false;

    }

    //Get the normal sides of the block; however, if we do not support transparency then attempt to get the opaque sides.
    //If we do not have opaque sides then use the normal sides.
    var sides = this._sides;
    if (!supportTransparency) {

        if (this._opaquesides !== null) {

            sides = this._opaquesides;

        }

    }
    //END OF if (!supportTransparency) {...

    this._scene = scene;

    //Each face texture is 8x8.
    this._position
    var blockGeometry = new THREE.CubeGeometry(this._scale, this._scale, this._scale);

    //Coordinate Map
    //---------------
    //Left-side (0)
    //Right-side (1)
    //Top (2)
    //Bottom (3)
    //Front (4)
    //Back (5)
    //---------------

    //Automatically detect the conditions.
    if (Object.keys(sides).length === 1) {

        //There is only one side, map all sides to the same uv coordinates.
        var u1 = (sides['sides']._u - 1) / 16;
        var u2 = sides['sides']._u / 16;
        var v1 = sides['sides']._v / 16;
        var v2 = (sides['sides']._v - 1) / 16;

        for (var i = 0; i < 6; i++) {

            blockGeometry.faceVertexUvs[0][i][0] = new THREE.UV(u1, v1);
            blockGeometry.faceVertexUvs[0][i][1] = new THREE.UV(u1, v2);
            blockGeometry.faceVertexUvs[0][i][2] = new THREE.UV(u2, v2);
            blockGeometry.faceVertexUvs[0][i][3] = new THREE.UV(u2, v1);

        }

    }
    else if (Object.keys(sides).length === 2) {

        //This condition occurs when only the top & bottom share the same coordinates that are different from the sides.
        var u1 = (sides['sides']._u - 1) / 16;
        var u2 = sides['sides']._u / 16;
        var v1 = sides['sides']._v / 16;
        var v2 = (sides['sides']._v - 1) / 16;

        //Unrolled loop for all sides.
        blockGeometry.faceVertexUvs[0][0][0] = new THREE.UV(u1, v1);
        blockGeometry.faceVertexUvs[0][0][1] = new THREE.UV(u1, v2);
        blockGeometry.faceVertexUvs[0][0][2] = new THREE.UV(u2, v2);
        blockGeometry.faceVertexUvs[0][0][3] = new THREE.UV(u2, v1);

        blockGeometry.faceVertexUvs[0][1][0] = new THREE.UV(u1, v1);
        blockGeometry.faceVertexUvs[0][1][1] = new THREE.UV(u1, v2);
        blockGeometry.faceVertexUvs[0][1][2] = new THREE.UV(u2, v2);
        blockGeometry.faceVertexUvs[0][1][3] = new THREE.UV(u2, v1);

        blockGeometry.faceVertexUvs[0][4][0] = new THREE.UV(u1, v1);
        blockGeometry.faceVertexUvs[0][4][1] = new THREE.UV(u1, v2);
        blockGeometry.faceVertexUvs[0][4][2] = new THREE.UV(u2, v2);
        blockGeometry.faceVertexUvs[0][4][3] = new THREE.UV(u2, v1);

        blockGeometry.faceVertexUvs[0][5][0] = new THREE.UV(u1, v1);
        blockGeometry.faceVertexUvs[0][5][1] = new THREE.UV(u1, v2);
        blockGeometry.faceVertexUvs[0][5][2] = new THREE.UV(u2, v2);
        blockGeometry.faceVertexUvs[0][5][3] = new THREE.UV(u2, v1);

        //Re-map the coordinates for the top.
        u1 = (sides['top']._u - 1) / 16;
        u2 = sides['top']._u / 16;
        v1 = sides['top']._v / 16;
        v2 = (sides['top']._v - 1) / 16;

        blockGeometry.faceVertexUvs[0][2][0] = new THREE.UV(u1, v1);
        blockGeometry.faceVertexUvs[0][2][1] = new THREE.UV(u1, v2);
        blockGeometry.faceVertexUvs[0][2][2] = new THREE.UV(u2, v2);
        blockGeometry.faceVertexUvs[0][2][3] = new THREE.UV(u2, v1);

        blockGeometry.faceVertexUvs[0][3][0] = new THREE.UV(u1, v1);
        blockGeometry.faceVertexUvs[0][3][1] = new THREE.UV(u1, v2);
        blockGeometry.faceVertexUvs[0][3][2] = new THREE.UV(u2, v2);
        blockGeometry.faceVertexUvs[0][3][3] = new THREE.UV(u2, v1);

    }
    else if (Object.keys(sides).length === 3) {

        //This condition occurs when only the top & bottom coordinates are different from the sides.
        var u1 = (sides['sides']._u - 1) / 16;
        var u2 = sides['sides']._u / 16;
        var v1 = sides['sides']._v / 16;
        var v2 = (sides['sides']._v - 1) / 16;

        //Unrolled loop for all sides.
        blockGeometry.faceVertexUvs[0][0][0] = new THREE.UV(u1, v1);
        blockGeometry.faceVertexUvs[0][0][1] = new THREE.UV(u1, v2);
        blockGeometry.faceVertexUvs[0][0][2] = new THREE.UV(u2, v2);
        blockGeometry.faceVertexUvs[0][0][3] = new THREE.UV(u2, v1);

        blockGeometry.faceVertexUvs[0][1][0] = new THREE.UV(u1, v1);
        blockGeometry.faceVertexUvs[0][1][1] = new THREE.UV(u1, v2);
        blockGeometry.faceVertexUvs[0][1][2] = new THREE.UV(u2, v2);
        blockGeometry.faceVertexUvs[0][1][3] = new THREE.UV(u2, v1);

        blockGeometry.faceVertexUvs[0][4][0] = new THREE.UV(u1, v1);
        blockGeometry.faceVertexUvs[0][4][1] = new THREE.UV(u1, v2);
        blockGeometry.faceVertexUvs[0][4][2] = new THREE.UV(u2, v2);
        blockGeometry.faceVertexUvs[0][4][3] = new THREE.UV(u2, v1);

        blockGeometry.faceVertexUvs[0][5][0] = new THREE.UV(u1, v1);
        blockGeometry.faceVertexUvs[0][5][1] = new THREE.UV(u1, v2);
        blockGeometry.faceVertexUvs[0][5][2] = new THREE.UV(u2, v2);
        blockGeometry.faceVertexUvs[0][5][3] = new THREE.UV(u2, v1);

        //Re-map the coordinates for the top.
        u1 = (sides['top']._u - 1) / 16;
        u2 = sides['top']._u / 16;
        v1 = sides['top']._v / 16;
        v2 = (sides['top']._v - 1) / 16;

        blockGeometry.faceVertexUvs[0][2][0] = new THREE.UV(u1, v1);
        blockGeometry.faceVertexUvs[0][2][1] = new THREE.UV(u1, v2);
        blockGeometry.faceVertexUvs[0][2][2] = new THREE.UV(u2, v2);
        blockGeometry.faceVertexUvs[0][2][3] = new THREE.UV(u2, v1);

        //Re-map the coordinates for the bottom.
        u1 = (sides['bottom']._u - 1) / 16;
        u2 = sides['bottom']._u / 16;
        v1 = sides['bottom']._v / 16;
        v2 = (sides['bottom']._v - 1) / 16;

        blockGeometry.faceVertexUvs[0][3][0] = new THREE.UV(u1, v1);
        blockGeometry.faceVertexUvs[0][3][1] = new THREE.UV(u1, v2);
        blockGeometry.faceVertexUvs[0][3][2] = new THREE.UV(u2, v2);
        blockGeometry.faceVertexUvs[0][3][3] = new THREE.UV(u2, v1);

    }
    else if (Object.keys(sides).length === 6) {

        //Every side is different...we have to map them all.

        for (var i = 0; i < 6; i++) {

            var coords = null;
            switch (i) {

                case 0:
                    coords = sides['leftside'];
                    break;

                case 1:
                    coords = sides['rightside'];
                    break;

                case 2:
                    coords = sides['top'];
                    break;

                case 3:
                    coords = sides['bottom'];
                    break;

                case 4:
                    coords = sides['front'];
                    break;

                case 5:
                    coords = sides['back'];
                    break;

            }

            var u1 = (coords._u - 1) / 16;
            var u2 = coords._u / 16;
            var v1 = coords._v / 16;
            var v2 = (coords._v - 1) / 16;

            blockGeometry.faceVertexUvs[0][i][0] = new THREE.UV(u1, v1);
            blockGeometry.faceVertexUvs[0][i][1] = new THREE.UV(u1, v2);
            blockGeometry.faceVertexUvs[0][i][2] = new THREE.UV(u2, v2);
            blockGeometry.faceVertexUvs[0][i][3] = new THREE.UV(u2, v1);

        }
        //END OF for (var i = 0; i < 6; i++) {...

    }
    //END OF if (Object.keys(sides).length === 1) {...

    blockMaterial = new THREE.MeshBasicMaterial({ map: this._texture, transparent: (transparent && supportTransparency) });
    this._blockMesh = new THREE.Mesh(blockGeometry, blockMaterial);
    this._blockMesh.position.set(this._position.x, this._position.y, this._position.z);

    this._blockMesh.dynamic = true;

    this._scene.add(this._blockMesh);

}


CaffeinatedRat.Minecraft.Spectator.Block.prototype.animate = function () {



}
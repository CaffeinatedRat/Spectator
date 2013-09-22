/** @license
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

* -----------------------------------------------------------------
* Required Libraries:
* 1) Three.js
* -----------------------------------------------------------------
*/

/**
* @constructor
*/
CaffeinatedRat.Minecraft.Spectator.Engine = function (parameters) {

    console.log('CaffeinatedRat.Minecraft.Spectator.Version: ' + CaffeinatedRat.Minecraft.Spectator.VERSION);

    //-----------------------------------------------------------------
    // Parameterization
    //-----------------------------------------------------------------

    parameters = parameters || {};

    if (parameters.webSocketServices !== undefined) {

        this._websocketServices = parameters.webSocketServices;

    }
    else {

        throw new CaffeinatedRat.Minecraft.Spectator.InvalidWebSocketServices();

    }

    if (parameters.canvas !== undefined) {

        this._canvas = parameters.canvas;

    }
    else {

        this._canvas = null;

    }

    if (parameters.image !== undefined) {

        this._image = parameters.image;

    }
    else {

        this._image = null;

    }

    if (parameters.scale !== undefined) {

        this._scale = parameters.scale;

    }
    else {

        this._scale = 300;

    }

    if (parameters.canvasWidth !== undefined) {

        this._canvasWidth = parameters.canvasWidth;

    }
    else {

        this._canvasWidth = 540;

    }

    if (parameters.canvasHeight !== undefined) {

        this._canvasHeight = parameters.canvasHeight;

    }
    else {

        this._canvasHeight = 540;

    }

    if (parameters.fancy !== undefined) {

        this._fancy = parameters.fancy;

    }
    else {

        this._fancy = false;

    }

    this._camera = null;
    this._scene = null;
    this._renderer = null;
    this._texture = null;
    this._chunk = [];

    this._controls = null;
    this._animationId = 0;
    this._stats = null;

    this._interval = 15000;

    this._controls2 = new Int32Array(8);

    var keybindings = {
        37: 0,
        39: 1,
        38: 2,
        40: 3,
        33: 4,
        34: 5,
        36: 6,
        35: 7
    };

    this._yawRotation = 0;
    this._pitchRotation = 0;

    window.addEventListener('keydown', keydown, false);
    window.addEventListener('keyup', keyup, false);

    function keydown(event) {

        //window.removeEventListener('keydown', keydown);
        mapKeys(event.which, 1);

    }

    function keyup(event) {

        window.addEventListener('keydown', keydown, false);
        mapKeys(event.which, 0);

    }

    var controls = this._controls2;

    function mapKeys(key, direction) {

        var controlIndex = keybindings[key];

        if (controlIndex !== undefined) {

            controls[controlIndex] = direction;

        }

    }

};

CaffeinatedRat.Minecraft.Spectator.Engine.prototype = {

    start: function (parameters) {

        //-----------------------------------------------------------------
        // Parameterization
        //-----------------------------------------------------------------

        parameters = parameters || {};

        var cameraNumber = 0;
        if (parameters.cameraNumber !== undefined) {

            cameraNumber = parameters.cameraNumber;

        }

        var that = this;

        var callWebSocketService = function () {

            //Create & attach the status object.
            that._stats = new Stats();
            that._stats.domElement.style.position = 'absolute';
            that._stats.domElement.style.left = '0px';
            that._stats.domElement.style.top = '0px';

            that._canvas.parentElement.appendChild(that._stats.domElement);

//            var data = {

//                chunkSizeX: 3,
//                chunkSizeY: 3,
//                chunkSizeZ: 3,
//                blocks:
//                [
//                ]

//            };

//            for (var i = -data.chunkSizeX; i <= data.chunkSizeX; i++) {
//                for (var j = -data.chunkSizeY; j <= data.chunkSizeY; j++) {
//                    for (var k = -data.chunkSizeZ; k <= data.chunkSizeZ; k++) {
//                        data.blocks.push({

//                            type: ((Math.random() * 100) > 85 ? 50 : 1),
//                            x: i,
//                            y: j,
//                            z: k
//                        });
//                    }
//                }
//            }

            //that.update(data);
            //that.animate();
            //$('#' + that._canvas.id).show();
            //$("#loadingSpectator").hide();

                    wss.callService('spectator camera ' + cameraNumber, {

                        callback: function (data) {

                            try {

                                that.update(data);
                                that.animate();

                                $('#' + that._canvas.id).show();
                                //NOTE: THIS MUST COME OUT OF HERE!!!!!
                                $("#loadingSpectator").hide();
                            }
                            catch (e) {

                                console.log(e);

                            }
                        }
                    });


        }

        this.init(callWebSocketService);

        //Set the update time.
        //    if (parameters.updateTime !== undefined) {

        //        setInterval(callWebSocketService, parameters.updateTime);

        //    }

    },

    init: function (callback) {

        clearTimeout(this._animationId);

        var img = new Image();
        var that = this;
        img.onload = function () {

            that._texture = new THREE.Texture(this);

            that._texture.magFilter = THREE.NearestFilter;
            that._texture.minFilter = THREE.NearestFilter;
            that._texture.needsUpdate = true;

            that._camera = new THREE.PerspectiveCamera(75, (that._canvasWidth / that._canvasHeight), 1, 10000);
            that._camera.position.z = 1000;

            //----------------------------------------------
            // Define the canvas & renderer
            //----------------------------------------------

            that._renderer = new THREE.WebGLRenderer({ antialias: false, canvas: that._canvas });
            that._renderer.setSize(that._canvasWidth, that._canvasHeight);
            that._renderer.setClearColor(new THREE.Color(0x4AB2F1), 1.0);

            //----------------------------------------------
            // Attach the camera controls.
            //----------------------------------------------

            that._controls = new THREE.TrackballControls(that._camera, that._canvas);

            if (callback !== undefined) {

                callback();

            }

        }
        img.onerror = function () {

        };

        img.src = this._image;

    },

    update: function (data) {

        if (data === undefined) {

            return;

        }

        //hack to prevent reading data that doesn't exist...
        if (data.chunkSizeX === undefined) {

            return;

        }

        this._scene = new THREE.Scene();

        if (this._chunk === undefined) {

            this._chunk = new Array();

        }

        //Get this from the data in the future.
        var chunkSize = new THREE.Vector3(data.chunkSizeX, data.chunkSizeY, data.chunkSizeZ);

        var blockCounter = 0;

        for (var i = 0; i < data.blocks.length; i++) {

            if (data.blocks[i].type > 0) {

                var isOccluded = false;
                if (this._fancy) {

                    isOccluded = this.isOccluded(data.blocks, i, chunkSize);

                }

                if (!isOccluded) {

                    this._chunk[blockCounter] = new CaffeinatedRat.Minecraft.Spectator.Block(blockdefs[data.blocks[i].type - 1]);
                    this._chunk[blockCounter]._texture = this._texture;
                    this._chunk[blockCounter]._scale = this._scale;
                    this._chunk[blockCounter]._position = new THREE.Vector3((data.blocks[i].x) * this._scale, (data.blocks[i].y) * this._scale, (data.blocks[i].z) * this._scale);

                    this._chunk[blockCounter].init(this._scene, this._fancy);

                }
                else {

                    this._chunk[blockCounter] = new CaffeinatedRat.Minecraft.Spectator.EmptyBlock();
                    this._chunk[blockCounter]._texture = this._texture;
                    this._chunk[blockCounter]._scale = this._scale;
                    this._chunk[blockCounter]._position = new THREE.Vector3((data.blocks[i].x) * this._scale, (data.blocks[i].y) * this._scale, (data.blocks[i].z) * this._scale);

                    this._chunk[blockCounter].init(this._scene, this._fancy);
                }

                blockCounter++;
            }

        }

    },

    //Determines if other blocks are occluding the current one and will not render it if is.
    isOccluded: function (blocks, index, chunkSize) {

        var block = blocks[index];

        //Check if we are on the edge of the chunk for the z-axis.
        if (Math.abs(block.z) == chunkSize.z) {

            return false;

        }

        //First check the block to the left of the current block on the z-axis, if that block is not on the edge.
        var zOffset = block.z + chunkSize.z;
        if (zOffset > 0) {

            //Cheat and get the previous index...no additional calculations.
            //If the left block is not an occulusion block then continue, else break out.
            if ((blocks[index - 1].type == 0) || (blocks[index - 1].type == 50) || ((blocks[index - 1].type == 9) && (block.type !== 9))) {

                return false;

            }

        }


        //Next check the block to the right of the current block on the z-axis, if that block is not on the edge.
        if (zOffset <= chunkSize.z) {

            //Cheat and get the next index...no additional calculations.
            //If the right block is not an occulusion block then continue, else break out.
            if ((blocks[index + 1].type == 0) || (blocks[index + 1].type == 50) || ((blocks[index + 1].type == 9) && (block.type !== 9))) {

                return false;

            }

        }

        //Now we have more complex calculations to preform and cannot cheat by moving +1 or -1 from the current index.  We now have to calculate the index.

        //Check if we are on the edge of the chunk for the y-axis.
        if (Math.abs(block.y) == chunkSize.y) {

            return false;

        }

        //Calculate our ranges for the x & y axis and the size of our xy plane.
        var xRange = chunkSize.x * 2 + 1;
        var yRange = chunkSize.y * 2 + 1;
        var xyPlaneRange = xRange * yRange;

        var xOffset = (block.x + chunkSize.x) * xyPlaneRange;
        var yOffset = block.y + chunkSize.y;

        //Verify that we have not reached the edge of the chunk.
        if (yOffset > 0) {

            //Find the block above our current block.
            var targetBlock = ((yOffset + 1) * yRange) + xOffset + zOffset;
            if ((targetBlock > 0) && (targetBlock < blocks.length)) {

                if ((blocks[targetBlock].type == 0) || (blocks[targetBlock].type == 50) || ((blocks[targetBlock].type == 9) && (block.type !== 9))) {

                    return false;

                }

            }

        }

        //Verify that we have not reached the edge of the chunk.
        if (yOffset <= chunkSize.y) {

            //Find the block above our current block.
            var targetBlock = ((yOffset - 1) * yRange) + xOffset + zOffset;
            if ((targetBlock > 0) && (targetBlock < blocks.length)) {

                if ((blocks[targetBlock].type == 0) || (blocks[targetBlock].type == 50) || ((blocks[targetBlock].type == 9) && (block.type !== 9))) {

                    return false;

                }

            }

        }

        //Check if we are on the edge of the chunk for the x-axis.
        if (Math.abs(block.x) == chunkSize.x) {

            return false;

        }

        //Finally, check the z-axis the most expensive to compute.
        xOffset = block.x + chunkSize.x;
        yOffset = (block.y + chunkSize.y) * yRange;

        //Verify that we have not reached the edge of the chunk.
        if (xOffset > 0) {

            //Find the block above our current block.
            var targetBlock = ((xOffset + 1) * xyPlaneRange) + yOffset + zOffset;
            if ((targetBlock > 0) && (targetBlock < blocks.length)) {

                if ((blocks[targetBlock].type == 0) || (blocks[targetBlock].type == 50) || ((blocks[targetBlock].type == 9) && (block.type !== 9))) {

                    return false;

                }

            }

        }

        //Verify that we have not reached the edge of the chunk.
        if (xOffset <= chunkSize.x) {

            //Find the block above our current block.
            var targetBlock = ((xOffset - 1) * xyPlaneRange) + yOffset + zOffset;
            if ((targetBlock > 0) && (targetBlock < blocks.length)) {

                if ((blocks[targetBlock].type == 0) || (blocks[targetBlock].type == 50) || ((blocks[targetBlock].type == 9) && (block.type !== 9))) {

                    return false;

                }

            }

        }

        return true;

    },

    animate: function () {

        var that = this;

        //Wrapper
        var callMethod = function () { that.animate(); }

        // note: three.js includes requestAnimationFrame shim
        this._animationId = requestAnimationFrame(callMethod);

        if (this._stats != null) {

            this._stats.begin();

        }

        if (this._controls != null) {

            //this._controls.update();

        }


        //---------------------------------------------------------
        var speed = 10;
        var rotationSpeed = Math.PI / 64;

        var yawDirection = this._controls2[0] ? 1 : this._controls2[1] ? -1 : 0;
        var thrustDirection = this._controls2[2] ? -1 : this._controls2[3] ? 1 : 0;
        var pitchDirection = this._controls2[4] ? 1 : this._controls2[5] ? -1 : 0;

        this._yawRotation += yawDirection * rotationSpeed;
        this._pitchRotation += pitchDirection * rotationSpeed;

        var rotation_matrix = new THREE.Matrix4().identity();
        rotation_matrix = new THREE.Matrix4().makeRotationFromEuler(new THREE.Vector3(this._pitchRotation, this._yawRotation, 0), 'YZX');
        var eye = new THREE.Vector3().setEulerFromRotationMatrix(rotation_matrix);
        this._camera.rotation = eye;

        //var target = new THREE.Vector3();
        //target.x = this._camera.position.x + (eye.x * thrustDirection * speed);
        //target.y = this._camera.position.y + (eye.y * thrustDirection * speed);
        //target.z = this._camera.position.z + (eye.z * thrustDirection * speed);

        //this._camera.position = target;
        this._camera.translateZ(thrustDirection * speed);
        //---------------------------------------------------------

        if ((this._renderer != null) && (this._scene != null)) {

            this._renderer.render(this._scene, this._camera);

        }

        if (this._stats != null) {

            this._stats.end();

        }

    },

    stop: function () {

        if ((this._animationId !== undefined) && (this._animationId > 0)) {

            window.cancelAnimationFrame(this._animationId);

        }

    }
}


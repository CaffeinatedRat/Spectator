/**
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

var blockdefs = [];
blockdefs = [
//Stone
	{
	sides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(2, 16)
	}
},
//Grass
	{
	sides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(4, 16),
	    'top': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(9, 14, 0x00ff00),
	    'bottom': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(3, 16)
	}
},
//Dirt
	{
	sides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(3, 16)
	}
},
//Cobble
	{
	sides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(1, 15)
	}
},
//Wood
	{
	sides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(5, 16)
	}
},
//Sapling
	{

},
//Bedrock
	{
	sides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(2, 15)
	}
},
//Water
	{

	sides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(16, 3)
	},
	transparent: true
},

//Stationary Water
	{

	sides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(16, 3)
	},
	transparent: true
},
//Lava
	{

	sides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(16, 1)
	}
},
//Stationary Lava
	{

	sides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(16, 1)
	}
},
//Sand
	{

	sides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(3, 15)
	}
},
//Gravel
	{

	sides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(4, 15)
	}
},
//Gold Ore
	{

	sides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(1, 14)
	}
},
//Iron Ore
	{

	sides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(2, 14)
	}
},
//Coal Ore
	{

	sides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(3, 14)
	}
},
//Log
	{
	sides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(5, 15),
	    'top': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(6, 15)
	}
},
//Leaves
	{
	sides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(5, 13, 0x00ff00)
	},
	transparent: true,
	opaquesides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(6, 13, 0x00ff00)
	}
},
//Sponge
	{
	sides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(1, 13)
	}
},
//Glass
	{
	sides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(2, 13)
	},
	transparent: true
},
//Lapis Ore
	{
	sides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(1, 6)
	}
},
//Lapis Block
	{
	sides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(1, 7)
	}
},
//DISPENSER
	{
	sides: {
	    'front': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(15, 14),
	    'leftside': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(14, 14),
	    'rightside': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(14, 14),
	    'back': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(14, 14),
	    'top': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(15, 13),
	    'bottom': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(15, 13)
	}
},
//SANDSTONE
	{
	sides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(1, 4),
	    'top': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(1, 5),
	    'bottom': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(1, 3)
	}
},
//NOTE_BLOCK
	{
	sides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(3, 13)
	}
},
//BED_BLOCK
	{
	sides: {
	    'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(7, 8)
	}
}

];

//Long grass
blockdefs[30] =
{
    sides: {
        'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(8, 14, 0x00ff00)
    },
    transparent: true
}

//OBSIDIAN
blockdefs[48] =
{
    sides: {
        'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(8, 5)
    }
}

//Torch
blockdefs[49] =
{
    sides: {
        'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(1, 11)
    },
    transparent: true,
    occludes: false
}


//Smooth Stone
blockdefs[97] =
{
    sides: {
        'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(6, 3)
    }
}

//Iron Fence
blockdefs[100] =
{
    sides: {
        'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(6, 11)
    },
    transparent: true
}


//Nether brick
blockdefs[111] =
{
    sides: {
        'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(1, 2)
    }
}

//Thin glass
blockdefs[101] =
{
    sides: {
        'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(2, 13)
    },
    transparent: true
}

//ENDER_STONE
blockdefs[120] =
{
    sides: {
        'sides': new CaffeinatedRat.Minecraft.Spectator.TextureCoordinates(16, 6)
    }
}
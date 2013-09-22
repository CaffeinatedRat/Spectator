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

package com.caffeinatedrat.Spectator;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

import org.bukkit.Material;
import org.bukkit.World;
import org.bukkit.block.Block;

import com.caffeinatedrat.SimpleWebSockets.Connection;
import com.caffeinatedrat.SimpleWebSockets.IApplicationLayer;
import com.caffeinatedrat.SimpleWebSockets.Session;
import com.caffeinatedrat.SimpleWebSockets.TextResponse;

public class ApplicationLayer implements IApplicationLayer {

    // ----------------------------------------------
    // Member Vars (fields)
    // ----------------------------------------------
    
    private org.bukkit.Server minecraftServer;
    private SpectatorConfiguration config;
    
    // ----------------------------------------------
    // Constructors
    // ----------------------------------------------
    public ApplicationLayer(org.bukkit.Server minecraftServer, SpectatorConfiguration config) {
        this.minecraftServer = minecraftServer;
        this.config = config;
    }
    
    @Override
    public void onTextFrame(String arguments, Session session) {

        //A text-response is what we'll use during the experimental phase, while we'll eventually move to a binary model.
        session.response = new TextResponse();

        if (arguments == null) {
            
            return;
            
        }
        
        int cameraNumber = 0;
        org.bukkit.util.Vector positionVector = null;
        org.bukkit.util.Vector rangeVector = null;
            
        try
        {
            String[] tokens = arguments.split(" ", 2);
            
            if (tokens.length < 2) {
                
                return;
                
            }
            
            if (!tokens[0].equalsIgnoreCase("camera")) {

                return;

            }
            
            cameraNumber = Integer.parseInt(tokens[1]);

            if( (positionVector = this.config.getCamera(cameraNumber)) == null) {
                
                return;
                
            }
        
            rangeVector = this.config.getRange(cameraNumber);
        }
        catch(NumberFormatException nfe)
        {
            return;
        }
        
        Hashtable<String, Object> masterCollection = ((TextResponse)session.response).getCollection();
        List<Hashtable<String, Object>> blocks = new ArrayList<Hashtable<String, Object>>();
        masterCollection.put("blocks", blocks);
        
        masterCollection.put("origin", MessageFormat.format("x: {0}, y: {1}, z: {2}", positionVector.getX(), positionVector.getY(), positionVector.getZ()));
        masterCollection.put("chunkSizeX", rangeVector.getBlockX());
        masterCollection.put("chunkSizeY", rangeVector.getBlockY());
        masterCollection.put("chunkSizeZ", rangeVector.getBlockZ());
        
        if (positionVector != null) {
            
            List<World> worlds = this.minecraftServer.getWorlds();
            
            if (worlds.size() > 0) {

                World world = worlds.get(0);
                
                int x = positionVector.getBlockX();
                int y = positionVector.getBlockY();
                int z = positionVector.getBlockZ();
                
                for (int i = (x - rangeVector.getBlockX()); i <= (x + rangeVector.getBlockX()); i++) {
                    
                    for (int j = (y - rangeVector.getBlockY()); j <= (y + rangeVector.getBlockY()); j++) {
                    
                        for (int k = (z - rangeVector.getBlockZ()); k <= (z + rangeVector.getBlockZ()); k++) {
                        
                            Block block = world.getBlockAt(i, j, k);
                            
                            if (block != null) {

                                Hashtable<String, Object> collection = new Hashtable<String, Object>();
                                Material material = block.getType();
                                
                                //Allocate 2^16 for the id when going binary.
                                collection.put("type", material.getId());
                                
                                //Allocate 2^32 for the each axis when going binary.
                                collection.put("x", i - positionVector.getBlockX());
                                collection.put("y", j - positionVector.getBlockY());
                                collection.put("z", k - positionVector.getBlockZ());
                                
                                //Allocate 2^32 for the environmental data.
                                collection.put("humidity", block.getHumidity());
                                collection.put("temperature", block.getTemperature());
                                
                                //Not sure what this does yet...
                                collection.put("data", block.getData());
                                
                                //Convert to a bitstring when going binary...
                                collection.put("isLiquid", block.isLiquid());
                                collection.put("isTransparent", material.isTransparent());
                                collection.put("isOccluding", material.isOccluding());
                                collection.put("isOccluding", material.isOccluding());
                                
                                blocks.add(collection);
                            }
                        }
                        //END OF for (int k = -scaleZ; k < ScaleZ; k++) {...
                    }
                    //END OF for (int j = -scaleY; j < scaleY; j++) {...
                }
                //END OF for(int i = -scaleX; i < scaleX; i++) {...
                
            }
            
        }
    }

    @Override
    public void onBinaryFrame(byte[] data, Session session) {
        // TODO Auto-generated method stub

    }

    @Override
    public void onClose() {
        // TODO Auto-generated method stub

    }

    @Override
    public void onPing(byte[] data) {
        // TODO Auto-generated method stub

    }

    @Override
    public void onPong() {
        // TODO Auto-generated method stub

    }

    public void onConnection(Connection connection) {
        // TODO Auto-generated method stub

    }
    
    public void onIdle(Session session) {

        // TODO Auto-generated method stub

    }
}

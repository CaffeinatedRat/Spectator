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

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.bukkit.configuration.InvalidConfigurationException;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.plugin.java.JavaPlugin;
import org.bukkit.util.Vector;

import com.caffeinatedrat.Spectator.Util.Logger;

public class SpectatorConfiguration extends YamlConfiguration {

    // ----------------------------------------------
    // Properties
    // ----------------------------------------------
    
    public int getDebugLevel() {
        return getInt("spectator.logging", 0);
    }
    
    public Boolean keepConnectionAlive() {
        return getBoolean("spectator.keepConnectionAlive", false);
    }

    public Vector getCamera() {
        
        Vector vector = new Vector();
        vector.setX(getInt("spectator.camera.x", 0));
        vector.setY(getInt("spectator.camera.y", 0));
        vector.setZ(getInt("spectator.camera.z", 0));
        
        return vector;
        
    }
    
    public Vector getRange() {
        
        Vector vector = new Vector();
        vector.setX(getInt("spectator.camera.range.x", 4));
        vector.setY(getInt("spectator.camera.range.y", 4));
        vector.setZ(getInt("spectator.camera.range.z", 4));
        
        return vector;
        
    }
    
    // ----------------------------------------------
    // Constructors
    // ----------------------------------------------
    
    public SpectatorConfiguration(JavaPlugin plugin) {
        super();
        
        try {
            load(new File(plugin.getDataFolder(), "config.yml"));
        } catch (FileNotFoundException e) {
        } catch (IOException e) {
            Logger.severe("Cannot load config.yml");
        } catch (InvalidConfigurationException e) {
            Logger.severe("Cannot load config.yml");
        }
    }
}

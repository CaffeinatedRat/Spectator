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

package com.caffeinatedrat.Spectator.Util;

import java.text.MessageFormat;
import java.util.logging.Level;

import com.caffeinatedrat.Spectator.Globals;

/**
 * A utility class that appends the plug-in's name to the log.
 *
 * @version 1.0.0.0
 * @author CaffeinatedRat
 */
public class Logger {
    
    private static java.util.logging.Logger logger = java.util.logging.Logger.getLogger("Minecraft");

    // ----------------------------------------------
    // Methods
    // ----------------------------------------------
    
    public static void severe(String msg) {
        logger.log(Level.SEVERE, MessageFormat.format("[Spectator] {0}", msg));
    }
    
    public static void warning(String msg) {
        logger.log(Level.WARNING, MessageFormat.format("[Spectator] {0}", msg));
    }
    
    public static void info(String msg) {
        logger.log(Level.INFO, MessageFormat.format("[Spectator] {0}", msg));
    }
    
    public static void debug(String msg) {
        if (Globals.isDebug()) {
            logger.log(Level.INFO, MessageFormat.format("[Spectator] {0}", msg));
        }
    }
    
    public static void verboseDebug(String msg)
    {
        if (Globals.isVerboseDebug()) {
            logger.log(Level.INFO, MessageFormat.format("[SpectatorGL] {0}", msg));
        }
    }    
}
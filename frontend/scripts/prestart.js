import fs from "fs";

// Create empty placeholders for fs, path, and os
global.fs = {};
global.fs.readFileSync = fs.readFileSync;
global.fs.writeFileSync = fs.writeFileSync;
global.path = {};
global.os = {};

// This file should be empty

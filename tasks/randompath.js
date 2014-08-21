/*
 * randompath
 * https://github.com/superway117/gruntplug
 *
 * Copyright (c) 2014 Eason
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('randompath', 'replace file path with a random sufix', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        var src =  grunt.file.read(filepath);
        var content = replacePath(src,options.path);
        grunt.file.write(f.dest, content);

      })
    });
  });

};
var replacePath = function(src,srcPath) {
 
  var replacePath = srcPath+"?_="+Math.floor((Math.random() * 1000) + 1);
  return src.replace(srcPath,replacePath);
};
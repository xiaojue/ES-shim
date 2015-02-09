/**
 * @author xiaojue[designsor@gmail.com]
 * @fileoverview gruntfile for ES-shim
 * @date 20150209
 */
var banner = '/* \r\n <%=pkg.name%> \r\n @author <%=pkg.author.name%> [<%=pkg.author.email%>] \r\n @fileoverview <%=pkg.description%> \r\n @vserion <%=pkg.version%> \r\n */\r\n';
module.exports = function(grunt) {
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        concat:{
            options:{
                banner:banner
            },
            files:{
                src:'',
                dest:''
            }
        },
        uglify:{
            options:{
                banner:banner
            },
            files:{
            }
        }
    });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat','uglify']);
};

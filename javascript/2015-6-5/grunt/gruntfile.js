//1.配置任务
//2.引入插件
//3.注册主任务——启动任务

module.exports=function (grunt){
	//1.配置任务
	grunt.initConfig({
		htmlmin: {
			aaa: {
				options: {removeComments: true, collapseWhitespace: true},
				files: {
					'1.html': 'html/addClass2.html'
				}
			}
		}
	});
	
	//2.加载插件
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	
	//3.注册主任务
	grunt.registerTask('default', ['htmlmin']);
};
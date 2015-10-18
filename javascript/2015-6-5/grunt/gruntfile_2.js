//1.配置任务
//2.引入插件
//3.注册主任务——启动任务

module.exports=function (grunt){
	//1.配置任务
	grunt.initConfig({
		uglify: {
			aaa: {
				src: 'js/*.js',
				dest:'main.js'
			}
		}
	});
	
	//2.加载插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	//3.注册主任务
	grunt.registerTask('default', ['uglify']);
};
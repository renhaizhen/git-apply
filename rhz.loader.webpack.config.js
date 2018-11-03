const path=require("path");
const webpack =require("webpack");

module.exports={    
    mode:'development',
    entry:{
        "main":"./src/2.js"
    },   
    output:{
        path:path.resolve('dist/'),
        filename:'build.js'
    },    
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        contentBase:path.resolve("static"),
        port:8090,
        hot:true,
        historyApiFallback:true
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:["style-loader","css-loader"]
            },
            {
                //检测文件名字
                test:/\.js$/,
                //排除 node_modules
                exclude:/node_modules/,
                //使用的loader
                // use:'babel-loader'
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['env']
                    }
                }
            }
        ]
    }
}

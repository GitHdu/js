requirejs.config({
    paths:{
        jquery:'jquery-1.10.1.min'//定义别名
    }
});
requirejs(['jquery','validate'],function($,validate){
    console.log(validate.isEqual(1,2));
});
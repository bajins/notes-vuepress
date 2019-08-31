# Swagger2注解

| 注解名称 | 注解属性 | 作用域 | 属性作用       |
|----------|----------|--------|----------------|
| @Api     | tags     | 类     | 说明该类的作用 |
|          | value    | 类     | 说明该类的作用 |
| @ApiOperation() | value    | 方法   | 描述方法作用 |
|                 | notes    | 方法   | 提示内容     |
|                 | tags     | 方法   | 分组         |
| @ApiParam() | name     | 方法参数 | 参数名   |
|             | value    | 方法参数 | 参数说明 |
|             | required | 方法参数 | 是否必填 |
| @ApiModel()         | value       | 类   | 对象名   |
|                     | description | 类   | 描述     |
| @ApiModelProperty() | value       | 方法 | 字段说明 |
|                     | name        | 方法 | 属性名   |
|                     | dataType    | 方法 | 属性类型 |
|                     | required    | 方法 | 是否必填 |
|                     | example     | 方法 | 举例     |
|                     | hidden      | 方法 | 隐藏     |
| @ApiImplicitParam() | value       | 方法 | 参数说明 |
|                     | name        | 方法 | 参数名   |
|                     | dataType    | 方法 | 数据类型 |
|                     | paramType   | 方法 | 参数类型 |
|                     | example     | 方法 | 举例     |
| @ApiResponse()      | response    | 方法 | 返回类   |
|                     | code        | 方法 | 返回码   |
|                     | message     | 方法 | 返回信息 |
|                     | examples    | 方法 | 例子     |


|        注解        |     属性     |        值       |               备注                      |
|--------------------|--------------|---------------------|-----------------------------------------|
| @Api               | value        | 字符串                 | 可用在class头上,class描述   |
|                    | description  | 字符串                 |                               |
|                    |              |                     | @Api(value = "xxx", description = "xxx")   |
| @ApiOperation      | value        | 字符串                 | 可用在方法头上.参数的描述容器         |
|                    | notes        | 字符串                 |                                        |
|                    |              |                     | @ApiOperation(value = "xxx", notes = "xxx")   |
| @ApiImplicitParams | {}         | @ApiImplicitParam数组 | 可用在方法头上.参数的描述容器               |
|                    |              |                     | @ApiImplicitParams({@ApiImplicitParam1,@ApiImplicitParam2,...}) |
| @ApiImplicitParam  | name         | 字符串 与参数命名对应         | 可用在@ApiImplicitParams里         |
|                    | value        | 字符串                 | 参数中文描述                          |
|                    | required     | 布尔值                 | true/false                         |
|                    | dataType     | 字符串                 | 参数类型                           |
|                    | paramType    | 字符串                 | 参数请求方式:query/path              |
|                    |              |                     | query:对应@RequestParam?传递            |
|                    |              |                     | path: 对应@PathVariable{}path传递         |
|                    | defaultValue | 字符串                 | 在api测试中默认值                        |
|                    |              |                     | 用例参见项目中的设置                       |
| @ApiResponses      | {}         | @ApiResponse数组      | 可用在方法头上.参数的描述容器               |
|                    |              |                     | @ApiResponses({@ApiResponse1,@ApiResponse2,...}) |
| @ApiResponse       | code         | 整形                  | 可用在@ApiResponses里                   |
|                    | message      | 字符串                 | 错误描述                             |
|                    |              |                     | @ApiResponse(code = 200, message = "Successful") |
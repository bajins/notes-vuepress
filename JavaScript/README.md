# JavaScript

## CDN
### npm
> unpkg：`https://unpkg.com`
>
> 知乎-unpkg：`http://unpkg.zhimg.com`
>
> 饿了么-unpkg：`http://npm.elemecdn.com`

#### 使用 unpkg
> 使用固定的版本号：
>> `unpkg.com/react@16.0.0/umd/react.production.min.js`
>>
>> `unpkg.com/react-dom@16.0.0/umd/react-dom.production.min.js`
>
> 也可使用语义化版本范围，或标签来代替固定版本号，亦可忽略版本和标签，直接使用最新的版本。
>> `unpkg.com/react@^16/umd/react.production.min.js`
>>
>> `unpkg.com/react/umd/react.production.min.js`
>
> 如果忽略了文件的路径（例如，使用裸网址 “bare” URL），unpkg 会提供 package.json 里指定的文件，或降级到 main。
>> `unpkg.com/d3`
>>
>> `unpkg.com/jquery`
>>
>> `unpkg.com/three`
>
> 注：这种方式会产生一次 302 到最新的文件 URL。好处是自动使用最新版，坏处是多一次性跳转，降低了性能。
>
> 在网址最后添加斜线，可以查看一个包内的所有文件列表。
>> `unpkg.com/react/`
>>
>> `unpkg.com/lodash/`

### other

[jsdelivr](https://www.jsdelivr.com/)

[cdnjs](https://cdnjs.com/)

[bootcdn](http://www.bootcdn.cn/)

[StaticfileCDN](http://staticfile.org/)

[75CDN](https://cdn.baomitu.com/)
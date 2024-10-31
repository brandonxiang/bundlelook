# bundlelook

查看bundle内部文件类型信息

## Command Line使用手册

```bash
>  bundlelook --help

  Usage
    $ bundlelook [dir] [options]

  Options
    -f, --filter     File size detail by specific file type
    -g, --group      File size statistics by group, join by comma
    --total          Get the total file size in total
    -v, --version    Displays current version
    -h, --help       Displays this message
```

## JS 调用方式

### Case 1 获取按文件类型统计

```javascript
import { getList } from 'bundlelook'
const res = getList({ dir: 'src' })
```

结果:

```javascript
[
  { name: 'png', min: 274, max: 293352, total: 2194651 },
  { name: 'tsx', min: 54, max: 50700, total: 2083425 },
  { name: 'json', min: 58252, max: 510819, total: 1317122 },
  { name: 'ttf', min: 170348, max: 171656, total: 513276 },
  { name: 'ts', min: 30, max: 82629, total: 428204 },
  { name: 'jpg', min: 7150, max: 246911, total: 308143 },
  { name: 'scss', min: 20, max: 7632, total: 303599 },
  { name: 'svg', min: 132, max: 63504, total: 201379 },
  { name: 'eot', min: 19924, max: 19924, total: 19924 },
  { name: 'md', min: 1486, max: 4637, total: 16575 },
  { name: 'woff', min: 13644, max: 13644, total: 13644 },
  { name: 'css', min: 745, max: 745, total: 745 }
]
```

### Case 2 通过聚类获取按文件类型统计

```javascript
import { getListByGroup } from 'bundlelook'
const res = getListByGroup({ dir: 'src', group: ['js,ts,tsx', 'png,jpg'] })
```

结果:

```javascript
[
  { name: 'js,ts,tsx', min: 30, max: 82629, total: 2511629 },
  { name: 'png,jpg', min: 274, max: 293352, total: 2502794 }
]
```

### Case 3 获取指定文件类型的排名

```javascript
import { getDetailByFilter } from 'bundlelook'
const res = getDetailByFilter({ dir: 'src', filter: 'js', size: 1000000 })
```

结果:

```javascript
[
  { path: 'assets/images/image_bank_card.png', size: 293352 },
  { path: 'assets/images/GSB_banner.png', size: 178227 },
]
```

### Case 4 看文件总体积

```javascript
import { getDirSize } from 'bundlelook'
const res = getDirSize({ dir: 'src'})
// 返回文件内容体积
```

### 其他格式化方法

- formatFileItem 格式化聚类文件信息
- formatSizeItem 格式化单类文件信息
- formatBytes 格式化某个文件体积数值

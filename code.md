
## > Document

Section
######一个基础的Section如下，它可以包含一个或者多个动态数据的交互

```
{
  "content": "Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability, style, or even provide a review.",
  "subheading": "This is a subheading",
  "markPrompt": "Scan code for details",
  "heading": "This is a heading",
  "collection": [
    {
      "coverImage": "https://site-file.fomillesite.com/0/001/img/800.jpg",
      "name": "Dar-H008",
      "summary": "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
    },
    {
      "coverImage": "https://site-file.fomillesite.com/0/001/img/800.jpg",
      "name": "2 This is a longer card with supporting  ",
      "summary": "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
    }
  ],
  "layout": "tile",
  "dataset": {
    "collection": {
      "quantity": 2,
      "data": [
        {
          "id": "1209760090157121538",
          "title": "CNC Machining Parts",
          "image": "https://site-file.fomillesite.com/1201424050841407490/1201461579862986754.jpg"
        }
      ],
      "dataType": 0,
      "type": "productCollection"
    }
  },
  "backgroundRepeat": "",
  "marginTop": false,
  "imageScale": "1by1"
}
```
DATA

```
{
  "id": "5b5245d3b3e34b95bcf2ba526bbf5209",
  "type": "CollectionCatalog",
  "data": {
    "heading": "Catalog",
    "displayHeading": true,
    "subheading": "Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability, style, or even provide a review.",
    "items": [
      
    ]
  }
}
```

Field | Description | Component | Component description
---|---|---|---
heading | 标题 | Text | 文本输入框
subheading | 内容文字 | Textarea | 多行文本输入框
displayHeading | 是否显标题 | Checkbox | 复选框

Example

```
{
  "id": "5b5245d3b3e34b95bcf2ba526bbf5209",
  "type": "CollectionCatalog",
  "data": {
    "heading": "Catalog",
    "subheading": "Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability, style, or even provide a review.",
    "displayHeading": true,
    "items": [
      
    ],
    "example": [
      {
        "collectionName": "Vivo Z1极光特别版 新一代全面屏AI双摄手机 4GB+64GB 移动联通电信全网通4G手机",
        "imageUrl": "https://code.fomille.cn/default/section/image-with-text.jpg",
        "seoUrl": "collections.html"
      }
    ]
  }
}
```


SCSS
```
$px: 0.0625rem;

.collection-catalog {
  .collection-catalog-heading {
    position: relative;
    text-align: center;
    color: var(--colorHeadings);

    &:after {
      position: absolute;
      content: '';
      height: 1 * $px;
      width: 80 * $px;
      left: calc(50% - #{40 * $px});
      bottom: -20 * $px;
      background-color: var(--colorBorder);
    }
  }

  &.no-line {
    h3 {
      &:after {
        display: none;
      }
    }

    .collection-catalog-subheading {
      margin-top: 20 * $px;
    }
  }

  .collection-catalog-subheading {
    font-size: 16 * $px;
    margin-top: 40 * $px;
    color: var(--colorSecondary);
  }

  .row {
    margin-top: 35 * $px;

    [class*="col-"] {
      a {
        display: block;
        color: var(--colorLink);

        img {
          margin-bottom: 20 * $px;
        }

        .collection-catalog-price {
          font-size: 28 * $px;
        }

        &:hover {
          text-decoration: none;
          color: var(--colorLinkHover);
          background: none;

        }
      }
    }
  }

  .btn {
    color: var(--colorButtonLabel);
    background-color: var(--colorButton);
    border: 0;
    padding: 0.5rem 50 * $px;
    margin-top: 3rem;
    transition: all 0.5s;

    &:hover {
      opacity: .8;
    }
  }

  @media (max-width: 768px) {
    .btn {
      margin-top: 1rem;
    }
    .collection-catalog-subheading {
      font-size: 14 * $px;
      margin-top: 30 * $px;
      color: var(--colorSecondary);
    }

    .row {
      margin-top: 15 * $px;

      [class*="col-"] {
        img {
          margin-bottom: 10 * $px;
        }

        .collection-catalog-price {
          font-size: 18 * $px;
        }
      }
    }

  }
}
```
HTML

```
<div class="cuckoo-section collection-catalog" data-section="5b5245d3b3e34b95bcf2ba526bbf5209">
    <div class="container">
        
        <h3 class="collection-catalog-heading">
            Catalog
        </h3>
        <p class="collection-catalog-subheading text-center">
            Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability, style, or even provide a review.
        </p>
        
        <div class="row">
            
            <div class="col-md-4">
                <a href="collections.html">
                    <img class="embed-responsive" src="https://code.fomille.cn/default/section/image-with-text.jpg" alt="Vivo Z1极光特别版 新一代全面屏AI双摄手机 4GB+64GB 移动联通电信全网通4G手机">
                    <p>
                        Vivo Z1极光特别版 新一代全面屏AI双摄手机 4GB+64GB 移动联通电信全网通4G手机
                    </p>
                </a>
            </div>
            
            <div class="col-md-4">
                <a href="collections.html">
                    <img class="embed-responsive" src="https://code.fomille.cn/default/section/image-with-text.jpg" alt="Apple iPhone X (A1865) 64GB 深空灰色 移动联通电信4G手机">
                    <p>
                        Apple iPhone X (A1865) 64GB 深空灰色 移动联通电信4G手机
                    </p>
                </a>
            </div>
            
            <div class="col-md-4">
                <a href="collections.html">
                    <img class="embed-responsive" src="https://code.fomille.cn/default/section/image-with-text.jpg" alt="黑鲨游戏手机 Helo 双液冷 更能打 8GB+128GB 极夜黑 全网通4G 双卡双待">
                    <p>
                        黑鲨游戏手机 Helo 双液冷 更能打 8GB+128GB 极夜黑 全网通4G 双卡双待
                    </p>
                </a>
            </div>
            
            <div class="col-md-4">
                <a href="collections.html">
                    <img class="embed-responsive" src="https://code.fomille.cn/default/section/image-with-text.jpg" alt="黑鲨游戏手机 Helo 双液冷 更能打 8GB+128GB 极夜黑 全网通4G 双卡双待">
                    <p>
                        黑鲨游戏手机 Helo 双液冷 更能打 8GB+128GB 极夜黑 全网通4G 双卡双待
                    </p>
                </a>
            </div>
            
            <div class="col-md-4">
                <a href="collections.html">
                    <img class="embed-responsive" src="https://code.fomille.cn/default/section/image-with-text.jpg" alt="Vivo Z1极光特别版 新一代全面屏AI双摄手机 4GB+64GB 移动联通电信全网通4G手机">
                    <p>
                        Vivo Z1极光特别版 新一代全面屏AI双摄手机 4GB+64GB 移动联通电信全网通4G手机
                    </p>
                </a>
            </div>
            
            <div class="col-md-4">
                <a href="collections.html">
                    <img class="embed-responsive" src="https://code.fomille.cn/default/section/image-with-text.jpg" alt="Apple iPhone X (A1865) 64GB 深空灰色 移动联通电信4G手机">
                    <p>
                        Apple iPhone X (A1865) 64GB 深空灰色 移动联通电信4G手机
                    </p>
                </a>
            </div>
            
            <div class="col-md-4">
                <a href="collections.html">
                    <img class="embed-responsive" src="https://code.fomille.cn/default/section/image-with-text.jpg" alt="黑鲨游戏手机 Helo 双液冷 更能打 8GB+128GB 极夜黑 全网通4G 双卡双待">
                    <p>
                        黑鲨游戏手机 Helo 双液冷 更能打 8GB+128GB 极夜黑 全网通4G 双卡双待
                    </p>
                </a>
            </div>
            
            <div class="col-md-4">
                <a href="collections.html">
                    <img class="embed-responsive" src="https://code.fomille.cn/default/section/image-with-text.jpg" alt="黑鲨游戏手机 Helo 双液冷 更能打 8GB+128GB 极夜黑 全网通4G 双卡双待">
                    <p>
                        黑鲨游戏手机 Helo 双液冷 更能打 8GB+128GB 极夜黑 全网通4G 双卡双待
                    </p>
                </a>
            </div>
            
            <div class="col-md-4">
                <a href="collections.html">
                    <img class="embed-responsive" src="https://code.fomille.cn/default/section/image-with-text.jpg" alt="黑鲨游戏手机 Helo 双液冷 更能打 8GB+128GB 极夜黑 全网通4G 双卡双待">
                    <p>
                        黑鲨游戏手机 Helo 双液冷 更能打 8GB+128GB 极夜黑 全网通4G 双卡双待
                    </p>
                </a>
            </div>
            
        </div>
    </div>
</div>
```
Art template

```
<div class="cuckoo-section collection-catalog" data-section="{sectionCode}">
    <div class="container">
        {{if displayHeading}}
        <h3 class="collection-catalog-heading">
            {{ heading }}
        </h3>
        <p class="collection-catalog-subheading text-center">
            {{ subheading }}
        </p>
        {{/if}}
        <div class="row">
            {{each example as el index}}
            <div class="{{ example.length % 3 == 1 && index == 0 ? 'col-md-12' : example.length % 3 == 2 && index < 2 ? 'col-md-6' : 'col-md-4' }}">
                <a href="{{ el.seoUrl }}">
                    <img class="embed-responsive" src="{{ el.imageUrl }}" alt="{{ el.collectionName }}">
                    <p>
                        {{ el.collectionName }}
                    </p>
                </a>
            </div>
            {{/each}}
        </div>
    </div>
</div>

```
Thymeleaf template


```
//
```

export type DimensionKey = "X" | "D" | "G" | "T" | "Q" | "R";
export type ScoreMap = Partial<Record<DimensionKey, number>>;

export type QuizOption = {
  key: "A" | "B" | "C" | "D";
  label: string;
  score: ScoreMap;
};

export type MainQuestion = {
  id: string;
  type: "main";
  dimension: DimensionKey;
  title: string;
  options: QuizOption[];
};

export type HiddenQuestion = {
  id: string;
  type: "hidden";
  trigger: string;
  title: string;
  options: QuizOption[];
};

export type HiddenPersonaRule = {
  id: string;
  name: string;
  condition: string;
  description: string;
};

export const dimensionLabels: Record<DimensionKey, string> = {
  X: "造景戏感",
  D: "点评锋利度",
  G: "小众审美雷达",
  T: "囤货执念",
  Q: "安利控场",
  R: "贴用代入",
};

export const mainQuestions: MainQuestion[] = [
  {
    "id": "Q1",
    "type": "main",
    "dimension": "X",
    "title": "收到一款新造景贴纸，你第一反应更像？",
    "options": [
      {
        "key": "A",
        "label": "先看看图和参数，确认它是什么",
        "score": {}
      },
      {
        "key": "B",
        "label": "想想它适合放在哪一页或哪一角",
        "score": {
          "X": 1
        }
      },
      {
        "key": "C",
        "label": "马上试摆一下构图，看能不能出片",
        "score": {
          "X": 2
        }
      },
      {
        "key": "D",
        "label": "脑内已经把主题、光影和背景纸都配好了",
        "score": {
          "X": 3
        }
      }
    ]
  },
  {
    "id": "Q2",
    "type": "main",
    "dimension": "D",
    "title": "写点评时发现贴感一般，你会怎么处理？",
    "options": [
      {
        "key": "A",
        "label": "不写了，怕说重了",
        "score": {}
      },
      {
        "key": "B",
        "label": "温和写一句“还行，但没有惊喜”",
        "score": {
          "D": 1
        }
      },
      {
        "key": "C",
        "label": "把产品质量、画面设计、贴感体验拆开说清楚",
        "score": {
          "D": 2
        }
      },
      {
        "key": "D",
        "label": "直接写雷点，后来人少花冤枉钱",
        "score": {
          "D": 3
        }
      }
    ]
  },
  {
    "id": "Q3",
    "type": "main",
    "dimension": "G",
    "title": "看到一款画风冷门、甚至有点怪的造景贴纸，你会？",
    "options": [
      {
        "key": "A",
        "label": "先划走，怕买回来不会用",
        "score": {}
      },
      {
        "key": "B",
        "label": "多看两眼，但不一定下手",
        "score": {
          "G": 1
        }
      },
      {
        "key": "C",
        "label": "加入想贴，等一个合适场景",
        "score": {
          "G": 2
        }
      },
      {
        "key": "D",
        "label": "怪得刚刚好，我甚至想专门为它搭一页",
        "score": {
          "G": 3
        }
      }
    ]
  },
  {
    "id": "Q4",
    "type": "main",
    "dimension": "T",
    "title": "同商家同系列只差最后一款没收，你通常会？",
    "options": [
      {
        "key": "A",
        "label": "差就差吧，系列不完整也能活",
        "score": {}
      },
      {
        "key": "B",
        "label": "先记一下，刷到再说",
        "score": {
          "T": 1
        }
      },
      {
        "key": "C",
        "label": "加进想贴，等补货或二手出现",
        "score": {
          "T": 2
        }
      },
      {
        "key": "D",
        "label": "收纳仓里少这一格，我看着就难受",
        "score": {
          "T": 3
        }
      }
    ]
  },
  {
    "id": "Q5",
    "type": "main",
    "dimension": "Q",
    "title": "发现页刷到一款冷门但高分的贴纸，你更可能？",
    "options": [
      {
        "key": "A",
        "label": "自己看看，不太参与",
        "score": {}
      },
      {
        "key": "B",
        "label": "点个赞或收藏，算是支持",
        "score": {
          "Q": 1
        }
      },
      {
        "key": "C",
        "label": "补一句短评，让别人知道它好在哪里",
        "score": {
          "Q": 2
        }
      },
      {
        "key": "D",
        "label": "带图点评，把它从角落推到点评墙上",
        "score": {
          "Q": 3
        }
      }
    ]
  },
  {
    "id": "Q6",
    "type": "main",
    "dimension": "R",
    "title": "一张贴纸已经贴进作品里了，你还会反复回看，主要因为？",
    "options": [
      {
        "key": "A",
        "label": "确认一下它确实已贴",
        "score": {}
      },
      {
        "key": "B",
        "label": "看看当时贴得顺不顺手",
        "score": {
          "R": 1
        }
      },
      {
        "key": "C",
        "label": "那一页的氛围还挺像当时的我",
        "score": {
          "R": 2
        }
      },
      {
        "key": "D",
        "label": "它像我的一小段造景史，不能只当库存看",
        "score": {
          "R": 3
        }
      }
    ]
  },
  {
    "id": "Q7",
    "type": "main",
    "dimension": "X",
    "title": "正式开始拼贴前，你通常怎么开局？",
    "options": [
      {
        "key": "A",
        "label": "找个空位，能贴下就行",
        "score": {}
      },
      {
        "key": "B",
        "label": "按尺寸和颜色大概排一下",
        "score": {
          "X": 1
        }
      },
      {
        "key": "C",
        "label": "先试构图，看看主角和留白怎么放",
        "score": {
          "X": 2
        }
      },
      {
        "key": "D",
        "label": "主题、层次、配件都要到位，不然不算开工",
        "score": {
          "X": 3
        }
      }
    ]
  },
  {
    "id": "Q8",
    "type": "main",
    "dimension": "D",
    "title": "别人问你“这款值不值得买”，你会怎么说？",
    "options": [
      {
        "key": "A",
        "label": "看你喜好吧，我不好说",
        "score": {}
      },
      {
        "key": "B",
        "label": "先报价格和商家，让对方自己判断",
        "score": {
          "D": 1
        }
      },
      {
        "key": "C",
        "label": "会讲材质、画面、贴感和适合场景",
        "score": {
          "D": 2
        }
      },
      {
        "key": "D",
        "label": "直接总结：值不值、坑在哪、谁适合买",
        "score": {
          "D": 3
        }
      }
    ]
  },
  {
    "id": "Q9",
    "type": "main",
    "dimension": "G",
    "title": "给贴纸选参考标签时，你更容易被哪类标签打动？",
    "options": [
      {
        "key": "A",
        "label": "通用、百搭、好上手",
        "score": {}
      },
      {
        "key": "B",
        "label": "可爱、清新、复古这种稳妥词",
        "score": {
          "G": 1
        }
      },
      {
        "key": "C",
        "label": "暗黑、破碎、边角料感这种偏门词",
        "score": {
          "G": 2
        }
      },
      {
        "key": "D",
        "label": "固定标签不够，我想自己写个怪但精准的",
        "score": {
          "G": 3
        }
      }
    ]
  },
  {
    "id": "Q10",
    "type": "main",
    "dimension": "T",
    "title": "收纳仓里“拥有”和“已贴”数量对不上时，你会？",
    "options": [
      {
        "key": "A",
        "label": "不影响我用，先放着",
        "score": {}
      },
      {
        "key": "B",
        "label": "想起来才改一下",
        "score": {
          "T": 1
        }
      },
      {
        "key": "C",
        "label": "会把拥有数量和已贴数量补准确",
        "score": {
          "T": 2
        }
      },
      {
        "key": "D",
        "label": "还要顺手补购买价，不然总价和均价不干净",
        "score": {
          "T": 3
        }
      }
    ]
  },
  {
    "id": "Q11",
    "type": "main",
    "dimension": "Q",
    "title": "商家详情里一堆“已贴未评”，你看见后更像？",
    "options": [
      {
        "key": "A",
        "label": "知道了，但不一定补",
        "score": {}
      },
      {
        "key": "B",
        "label": "挑一张最有话说的补一下",
        "score": {
          "Q": 1
        }
      },
      {
        "key": "C",
        "label": "按系列慢慢补，别让好用的贴纸没声音",
        "score": {
          "Q": 2
        }
      },
      {
        "key": "D",
        "label": "感觉自己在给这个商家做体验档案",
        "score": {
          "Q": 3
        }
      }
    ]
  },
  {
    "id": "Q12",
    "type": "main",
    "dimension": "R",
    "title": "给贴纸拍图点评时，你最想拍出什么？",
    "options": [
      {
        "key": "A",
        "label": "拍清楚就行，别糊",
        "score": {}
      },
      {
        "key": "B",
        "label": "展示尺寸、材质和实物颜色",
        "score": {
          "R": 1
        }
      },
      {
        "key": "C",
        "label": "拍它贴进场景后的氛围",
        "score": {
          "R": 2
        }
      },
      {
        "key": "D",
        "label": "拍到像它终于住进了那个画面里",
        "score": {
          "R": 3
        }
      }
    ]
  },
  {
    "id": "Q13",
    "type": "main",
    "dimension": "X",
    "title": "一张普通贴纸到你手里，怎么才算被用出效果？",
    "options": [
      {
        "key": "A",
        "label": "平贴整齐就可以",
        "score": {}
      },
      {
        "key": "B",
        "label": "颜色别太冲突就行",
        "score": {
          "X": 1
        }
      },
      {
        "key": "C",
        "label": "要跟背景纸、便签或小物搭起来",
        "score": {
          "X": 2
        }
      },
      {
        "key": "D",
        "label": "它最好变成整个微型世界的主角",
        "score": {
          "X": 3
        }
      }
    ]
  },
  {
    "id": "Q14",
    "type": "main",
    "dimension": "D",
    "title": "看到一条只写“很好看”的水点评，你通常会？",
    "options": [
      {
        "key": "A",
        "label": "算了，大家开心就好",
        "score": {}
      },
      {
        "key": "B",
        "label": "心里想：那到底哪里好看",
        "score": {
          "D": 1
        }
      },
      {
        "key": "C",
        "label": "会补充真实贴感和使用限制",
        "score": {
          "D": 2
        }
      },
      {
        "key": "D",
        "label": "想写一条对照组，把优缺点掰开讲",
        "score": {
          "D": 3
        }
      }
    ]
  },
  {
    "id": "Q15",
    "type": "main",
    "dimension": "G",
    "title": "什么最容易让你点“想贴”？",
    "options": [
      {
        "key": "A",
        "label": "大家都说好用，跟着点不亏",
        "score": {}
      },
      {
        "key": "B",
        "label": "封面顺眼、商家靠谱",
        "score": {
          "G": 1
        }
      },
      {
        "key": "C",
        "label": "细节、材质或构图有少见的点",
        "score": {
          "G": 2
        }
      },
      {
        "key": "D",
        "label": "它怪到让我想看看自己能不能驾驭",
        "score": {
          "G": 3
        }
      }
    ]
  },
  {
    "id": "Q16",
    "type": "main",
    "dimension": "T",
    "title": "购买价和数量字段，你通常会怎么填？",
    "options": [
      {
        "key": "A",
        "label": "不填，反正贴纸已经到手了",
        "score": {}
      },
      {
        "key": "B",
        "label": "只记比较贵或印象深的",
        "score": {
          "T": 1
        }
      },
      {
        "key": "C",
        "label": "尽量补，方便看商家总价",
        "score": {
          "T": 2
        }
      },
      {
        "key": "D",
        "label": "均价、渠道、数量都要对齐，不然我会惦记",
        "score": {
          "T": 3
        }
      }
    ]
  },
  {
    "id": "Q17",
    "type": "main",
    "dimension": "Q",
    "title": "你写点评时，最希望它起什么作用？",
    "options": [
      {
        "key": "A",
        "label": "留个记录，证明我用过",
        "score": {}
      },
      {
        "key": "B",
        "label": "以后自己回看时有依据",
        "score": {
          "Q": 1
        }
      },
      {
        "key": "C",
        "label": "帮别人判断它适不适合拼贴",
        "score": {
          "Q": 2
        }
      },
      {
        "key": "D",
        "label": "让后来者直接按我的安利或避坑走",
        "score": {
          "Q": 3
        }
      }
    ]
  },
  {
    "id": "Q18",
    "type": "main",
    "dimension": "R",
    "title": "一个已贴作品最让你不舍的是什么？",
    "options": [
      {
        "key": "A",
        "label": "贴纸本身还挺好看",
        "score": {}
      },
      {
        "key": "B",
        "label": "商家和系列值得记住",
        "score": {
          "R": 1
        }
      },
      {
        "key": "C",
        "label": "完成那一刻很爽",
        "score": {
          "R": 2
        }
      },
      {
        "key": "D",
        "label": "画面里像藏着我当时的状态",
        "score": {
          "R": 3
        }
      }
    ]
  },
  {
    "id": "Q19",
    "type": "main",
    "dimension": "X",
    "title": "发布带图点评时，你的配图风格更像？",
    "options": [
      {
        "key": "A",
        "label": "随手拍一张，能看清就行",
        "score": {}
      },
      {
        "key": "B",
        "label": "尽量拍清楚材质和大小",
        "score": {
          "X": 1
        }
      },
      {
        "key": "C",
        "label": "会挑角度，让画面看起来舒服",
        "score": {
          "X": 2
        }
      },
      {
        "key": "D",
        "label": "像给这款贴纸拍小型作品集",
        "score": {
          "X": 3
        }
      }
    ]
  },
  {
    "id": "Q20",
    "type": "main",
    "dimension": "D",
    "title": "贴纸质量翻车时，你会怎么点评？",
    "options": [
      {
        "key": "A",
        "label": "忍了，不想写差评",
        "score": {}
      },
      {
        "key": "B",
        "label": "扣点分，但正文轻轻带过",
        "score": {
          "D": 1
        }
      },
      {
        "key": "C",
        "label": "说清楚起翘、掉色、粘性或切模问题",
        "score": {
          "D": 2
        }
      },
      {
        "key": "D",
        "label": "图文并茂公开处刑，但每句话都有证据",
        "score": {
          "D": 3
        }
      }
    ]
  },
  {
    "id": "Q21",
    "type": "main",
    "dimension": "G",
    "title": "碰到几乎没人点评的小众商家，你会？",
    "options": [
      {
        "key": "A",
        "label": "先不碰，等别人试水",
        "score": {}
      },
      {
        "key": "B",
        "label": "看看价格和图，谨慎一点",
        "score": {
          "G": 1
        }
      },
      {
        "key": "C",
        "label": "买一张观察，顺便补第一条体验",
        "score": {
          "G": 2
        }
      },
      {
        "key": "D",
        "label": "越没人评越有探索欲，我就是要挖冷门",
        "score": {
          "G": 3
        }
      }
    ]
  },
  {
    "id": "Q22",
    "type": "main",
    "dimension": "T",
    "title": "收纳仓筛选里，你最常点哪个入口？",
    "options": [
      {
        "key": "A",
        "label": "很少筛，直接翻",
        "score": {}
      },
      {
        "key": "B",
        "label": "先看拥有，知道自己有什么",
        "score": {
          "T": 1
        }
      },
      {
        "key": "C",
        "label": "常看未贴和未评，提醒自己补作业",
        "score": {
          "T": 2
        }
      },
      {
        "key": "D",
        "label": "按商家、系列、价格、状态轮番盘一遍",
        "score": {
          "T": 3
        }
      }
    ]
  },
  {
    "id": "Q23",
    "type": "main",
    "dimension": "Q",
    "title": "点评区有人问“这款怎么搭”，你会？",
    "options": [
      {
        "key": "A",
        "label": "看看就走，我不太回",
        "score": {}
      },
      {
        "key": "B",
        "label": "简单说一句适合什么风格",
        "score": {
          "Q": 1
        }
      },
      {
        "key": "C",
        "label": "会推荐同商家系列或相近材质",
        "score": {
          "Q": 2
        }
      },
      {
        "key": "D",
        "label": "顺手写成搭配小教程，省得大家乱买",
        "score": {
          "Q": 3
        }
      }
    ]
  },
  {
    "id": "Q24",
    "type": "main",
    "dimension": "R",
    "title": "你最容易因为什么给一款贴纸高分？",
    "options": [
      {
        "key": "A",
        "label": "质量稳定，不出错",
        "score": {}
      },
      {
        "key": "B",
        "label": "画面好看，贴起来顺手",
        "score": {
          "R": 1
        }
      },
      {
        "key": "C",
        "label": "一贴上去，整页氛围就对了",
        "score": {
          "R": 2
        }
      },
      {
        "key": "D",
        "label": "它让我的造景突然有故事了",
        "score": {
          "R": 3
        }
      }
    ]
  },
  {
    "id": "Q25",
    "type": "main",
    "dimension": "X",
    "title": "如果一张贴纸本身不够出片，你会？",
    "options": [
      {
        "key": "A",
        "label": "放弃，它不适合我",
        "score": {}
      },
      {
        "key": "B",
        "label": "放在边角，当小装饰",
        "score": {
          "X": 1
        }
      },
      {
        "key": "C",
        "label": "加背景纸、便签或小贴补氛围",
        "score": {
          "X": 2
        }
      },
      {
        "key": "D",
        "label": "重搭一整套场景把它救活",
        "score": {
          "X": 3
        }
      }
    ]
  },
  {
    "id": "Q26",
    "type": "main",
    "dimension": "D",
    "title": "你最不能忍哪种点评盲区？",
    "options": [
      {
        "key": "A",
        "label": "没有，大家随便写写也行",
        "score": {}
      },
      {
        "key": "B",
        "label": "不说实际尺寸，只说好看",
        "score": {
          "D": 1
        }
      },
      {
        "key": "C",
        "label": "不说贴感体验，只会夸可爱",
        "score": {
          "D": 2
        }
      },
      {
        "key": "D",
        "label": "起翘、透明边、切模问题全都不提",
        "score": {
          "D": 3
        }
      }
    ]
  },
  {
    "id": "Q27",
    "type": "main",
    "dimension": "G",
    "title": "面对爆款造景贴，你更像？",
    "options": [
      {
        "key": "A",
        "label": "安心买，爆款有爆款的道理",
        "score": {}
      },
      {
        "key": "B",
        "label": "看腻了，但确实能用",
        "score": {
          "G": 1
        }
      },
      {
        "key": "C",
        "label": "想找一个没那么撞款的替代",
        "score": {
          "G": 2
        }
      },
      {
        "key": "D",
        "label": "越爆我越想反着来，冷门角落才有意思",
        "score": {
          "G": 3
        }
      }
    ]
  },
  {
    "id": "Q28",
    "type": "main",
    "dimension": "T",
    "title": "一张库存贴纸很久没贴，你通常怎么想？",
    "options": [
      {
        "key": "A",
        "label": "可能会忘，问题不大",
        "score": {}
      },
      {
        "key": "B",
        "label": "有空再贴，总会轮到",
        "score": {
          "T": 1
        }
      },
      {
        "key": "C",
        "label": "会在未贴里看到它，提醒自己别浪费",
        "score": {
          "T": 2
        }
      },
      {
        "key": "D",
        "label": "它在收纳仓里像一项未完成任务",
        "score": {
          "T": 3
        }
      }
    ]
  },
  {
    "id": "Q29",
    "type": "main",
    "dimension": "Q",
    "title": "你整理商家均分和已评状态，最主要是为了？",
    "options": [
      {
        "key": "A",
        "label": "系统有就看看，不特意管",
        "score": {}
      },
      {
        "key": "B",
        "label": "方便自己以后回购或避开",
        "score": {
          "Q": 1
        }
      },
      {
        "key": "C",
        "label": "以后给别人推荐时有依据",
        "score": {
          "Q": 2
        }
      },
      {
        "key": "D",
        "label": "我需要一套可公开安利和避雷的榜单",
        "score": {
          "Q": 3
        }
      }
    ]
  },
  {
    "id": "Q30",
    "type": "main",
    "dimension": "R",
    "title": "如果要取消收纳一张贴纸，你最容易卡在哪一步？",
    "options": [
      {
        "key": "A",
        "label": "不卡，确认不用就删",
        "score": {}
      },
      {
        "key": "B",
        "label": "用过就够了，偶尔可惜",
        "score": {
          "R": 1
        }
      },
      {
        "key": "C",
        "label": "会想起当时贴过的那一页",
        "score": {
          "R": 2
        }
      },
      {
        "key": "D",
        "label": "像从自己的造景史里剪掉一页",
        "score": {
          "R": 3
        }
      }
    ]
  },
  {
    "id": "Q31",
    "type": "main",
    "dimension": "X",
    "title": "一页拼贴怎么才算被你“贴活了”？",
    "options": [
      {
        "key": "A",
        "label": "能贴下就行",
        "score": {}
      },
      {
        "key": "B",
        "label": "颜色不打架，基本就过关",
        "score": {
          "X": 1
        }
      },
      {
        "key": "C",
        "label": "前景和背景得互相托住",
        "score": {
          "X": 2
        }
      },
      {
        "key": "D",
        "label": "像一小帧有呼吸感的场景，才算真的活了",
        "score": {
          "X": 3
        }
      }
    ]
  },
  {
    "id": "Q32",
    "type": "main",
    "dimension": "D",
    "title": "别人夸一款贴纸“绝美”，但没写任何细节，你最可能？",
    "options": [
      {
        "key": "A",
        "label": "划走，懒得较真",
        "score": {}
      },
      {
        "key": "B",
        "label": "心里会想：那到底美在哪",
        "score": {
          "D": 1
        }
      },
      {
        "key": "C",
        "label": "想补一句真实贴感和适用场景",
        "score": {
          "D": 2
        }
      },
      {
        "key": "D",
        "label": "想直接写条对照点评把话说完整",
        "score": {
          "D": 3
        }
      }
    ]
  },
  {
    "id": "Q33",
    "type": "main",
    "dimension": "G",
    "title": "下面哪种新品最容易让你破防下单？",
    "options": [
      {
        "key": "A",
        "label": "稳定百搭的热门款",
        "score": {}
      },
      {
        "key": "B",
        "label": "轻复古、轻胶片这类安全区风格",
        "score": {
          "G": 1
        }
      },
      {
        "key": "C",
        "label": "元素混搭、细节古怪但还算好驾驭",
        "score": {
          "G": 2
        }
      },
      {
        "key": "D",
        "label": "像废墟边角料一样怪，但怪得特别对胃口",
        "score": {
          "G": 3
        }
      }
    ]
  },
  {
    "id": "Q34",
    "type": "main",
    "dimension": "T",
    "title": "看到某系列的断货提醒，你第一反应通常是？",
    "options": [
      {
        "key": "A",
        "label": "无感，断了就断了",
        "score": {}
      },
      {
        "key": "B",
        "label": "先点个收藏，改天再看",
        "score": {
          "T": 1
        }
      },
      {
        "key": "C",
        "label": "立刻核对自己库存里还缺什么",
        "score": {
          "T": 2
        }
      },
      {
        "key": "D",
        "label": "补缺、对格、清单同步，一套动作直接开干",
        "score": {
          "T": 3
        }
      }
    ]
  },
  {
    "id": "Q35",
    "type": "main",
    "dimension": "Q",
    "title": "评论区有人问“新手先买哪张”，你会？",
    "options": [
      {
        "key": "A",
        "label": "不回，让他自己逛",
        "score": {}
      },
      {
        "key": "B",
        "label": "回一句看预算和风格",
        "score": {
          "Q": 1
        }
      },
      {
        "key": "C",
        "label": "会给一个不容易翻车的入门顺序",
        "score": {
          "Q": 2
        }
      },
      {
        "key": "D",
        "label": "直接写一条清单，顺便把避坑也补上",
        "score": {
          "Q": 3
        }
      }
    ]
  },
  {
    "id": "Q36",
    "type": "main",
    "dimension": "R",
    "title": "一张贴纸从“想贴”变成“已贴”，哪个瞬间最让你满足？",
    "options": [
      {
        "key": "A",
        "label": "状态终于切过去了",
        "score": {}
      },
      {
        "key": "B",
        "label": "页面完成度更高了",
        "score": {
          "R": 1
        }
      },
      {
        "key": "C",
        "label": "那一页的气氛一下被点亮",
        "score": {
          "R": 2
        }
      },
      {
        "key": "D",
        "label": "像把自己当时那点心情正式贴进去了",
        "score": {
          "R": 3
        }
      }
    ]
  },
  {
    "id": "Q37",
    "type": "main",
    "dimension": "X",
    "title": "你给一页拼贴选背景纸时，更像哪种人？",
    "options": [
      {
        "key": "A",
        "label": "拿到什么用什么",
        "score": {}
      },
      {
        "key": "B",
        "label": "挑个差不多顺眼的颜色",
        "score": {
          "X": 1
        }
      },
      {
        "key": "C",
        "label": "会根据主角贴去配材质和层次",
        "score": {
          "X": 2
        }
      },
      {
        "key": "D",
        "label": "连光影、空气感和页面节奏都一起想了",
        "score": {
          "X": 3
        }
      }
    ]
  },
  {
    "id": "Q38",
    "type": "main",
    "dimension": "D",
    "title": "朋友晒新入手的贴纸，你实际觉得一般，会怎么回？",
    "options": [
      {
        "key": "A",
        "label": "礼貌夸一下就算了",
        "score": {}
      },
      {
        "key": "B",
        "label": "说一句“看个人风格吧”",
        "score": {
          "D": 1
        }
      },
      {
        "key": "C",
        "label": "会提醒它更适合什么、不适合什么",
        "score": {
          "D": 2
        }
      },
      {
        "key": "D",
        "label": "优点缺点一起讲，但保证句句都站得住",
        "score": {
          "D": 3
        }
      }
    ]
  },
  {
    "id": "Q39",
    "type": "main",
    "dimension": "G",
    "title": "如果要做一页“没人会这么贴”的拼贴，你最可能从哪下手？",
    "options": [
      {
        "key": "A",
        "label": "我一般不这么折腾",
        "score": {}
      },
      {
        "key": "B",
        "label": "先换一个不常见的配色",
        "score": {
          "G": 1
        }
      },
      {
        "key": "C",
        "label": "从材质、题材或边角角色开始偏一点",
        "score": {
          "G": 2
        }
      },
      {
        "key": "D",
        "label": "直接拿最怪的核心贴定调，剩下都围着它转",
        "score": {
          "G": 3
        }
      }
    ]
  },
  {
    "id": "Q40",
    "type": "main",
    "dimension": "T",
    "title": "月底盘仓时，哪种状态最容易让你坐不住？",
    "options": [
      {
        "key": "A",
        "label": "没有，月底就月底",
        "score": {}
      },
      {
        "key": "B",
        "label": "还有几张未评，但问题不大",
        "score": {
          "T": 1
        }
      },
      {
        "key": "C",
        "label": "未贴太多，会想赶紧消化库存",
        "score": {
          "T": 2
        }
      },
      {
        "key": "D",
        "label": "拥有、已贴、价格三栏对不上，我会浑身难受",
        "score": {
          "T": 3
        }
      }
    ]
  }
] as MainQuestion[];

export const hiddenQuestions: HiddenQuestion[] = [
  {
    "id": "H1",
    "type": "hidden",
    "trigger": "X >= 10 && D >= 10",
    "title": "你给一款贴纸写低分带图点评时，最爽的是哪一步？",
    "options": [
      {
        "key": "A",
        "label": "先用精致造景证明我真的认真用过",
        "score": {
          "X": 2
        }
      },
      {
        "key": "B",
        "label": "把质量和贴感问题讲到无法反驳",
        "score": {
          "D": 2
        }
      },
      {
        "key": "C",
        "label": "又有图又有刀，甚至还挺漂亮",
        "score": {
          "X": 1,
          "D": 1
        }
      },
      {
        "key": "D",
        "label": "算了，差评也要花力气",
        "score": {}
      }
    ]
  },
  {
    "id": "H2",
    "type": "hidden",
    "trigger": "G >= 10 && T >= 10",
    "title": "一款冷门商家的怪味系列突然下架，你更不能接受哪件事？",
    "options": [
      {
        "key": "A",
        "label": "这么怪得刚刚好的风格没了",
        "score": {
          "G": 2
        }
      },
      {
        "key": "B",
        "label": "我的系列收纳永远差最后一款",
        "score": {
          "T": 2
        }
      },
      {
        "key": "C",
        "label": "两种都不能接受，我会记到下次补货梦里",
        "score": {
          "G": 1,
          "T": 1
        }
      },
      {
        "key": "D",
        "label": "都还好，贴纸玩家也要学会释怀",
        "score": {}
      }
    ]
  },
  {
    "id": "H3",
    "type": "hidden",
    "trigger": "Q >= 10 && R >= 10",
    "title": "你发布一条高分点评，最想留下什么？",
    "options": [
      {
        "key": "A",
        "label": "帮别人判断它到底适不适合入",
        "score": {
          "Q": 2
        }
      },
      {
        "key": "B",
        "label": "记录它在我那页造景里的位置",
        "score": {
          "R": 2
        }
      },
      {
        "key": "C",
        "label": "既能安利别人，又能保存自己的作品记忆",
        "score": {
          "Q": 1,
          "R": 1
        }
      },
      {
        "key": "D",
        "label": "没有那么伟大，贴完顺手写一下",
        "score": {}
      }
    ]
  },
  {
    "id": "H4",
    "type": "hidden",
    "trigger": "满足任一隐藏人格条件时出现",
    "title": "如果把你的收纳仓拍成纪录片，片名最像哪一个？",
    "options": [
      {
        "key": "A",
        "label": "《我不是毒舌，我只是认真用过》",
        "score": {}
      },
      {
        "key": "B",
        "label": "《未贴库存今晚必须清点》",
        "score": {}
      },
      {
        "key": "C",
        "label": "《一张贴纸住进我的小世界》",
        "score": {}
      },
      {
        "key": "D",
        "label": "《我真的只是随便贴贴》",
        "score": {}
      }
    ]
  }
] as HiddenQuestion[];

export const hiddenPersonaRules: HiddenPersonaRule[] = [
  {
    "id": "hidden-judgement",
    "name": "带图避雷审判官",
    "condition": "D >= 12 && Q <= 5",
    "description": "你不是刻薄，你只是把每个雷点都拍得清清楚楚。"
  },
  {
    "id": "hidden-hamster",
    "name": "收纳仓仓管神",
    "condition": "T >= 13 && G <= 6",
    "description": "你收贴纸像管库存，拥有、已贴、未评都得对齐。"
  },
  {
    "id": "hidden-midnight",
    "name": "造景剧场主演",
    "condition": "X >= 12 && R >= 12",
    "description": "你贴的不是素材，是一小段带情绪的布景。"
  }
] as HiddenPersonaRule[];

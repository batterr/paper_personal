export type DimensionKey = "X" | "D" | "G" | "T" | "Q" | "R";
export type ScoreMap = Partial<Record<DimensionKey, number>>;

export type QuizOption = {
  key: "A" | "B" | "C" | "D";
  label: string;
  score: ScoreMap;
};

export type QuestionCategory = "formal" | "chaos" | "random";

export type MainQuestion = {
  id: string;
  type: "main";
  dimension: DimensionKey;
  category: QuestionCategory;
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
    "category": "formal",
    "title": "你看到一张贴纸平均分很高，但评论里反复提到“遮挡部分看不清”，你更像？",
    "options": [
      {
        "key": "A",
        "label": "分高就行，先入再说",
        "score": {}
      },
      {
        "key": "B",
        "label": "先看看是不是还能靠经验救回来",
        "score": {
          "X": 1
        }
      },
      {
        "key": "C",
        "label": "会脑补它贴进场景后能不能绕开这个坑",
        "score": {
          "X": 2
        }
      },
      {
        "key": "D",
        "label": "已经在想怎么通过构图和前景把它遮挡问题反杀了",
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
    "category": "formal",
    "title": "真实评论里有人写“图很美，但拆分逻辑像在整我”，你的反应更像？",
    "options": [
      {
        "key": "A",
        "label": "我一般不评价，别人觉得行就行",
        "score": {}
      },
      {
        "key": "B",
        "label": "记一句：设计好看，体验一般",
        "score": {
          "D": 1
        }
      },
      {
        "key": "C",
        "label": "会分开讲设计分、质量分、贴感分",
        "score": {
          "D": 2
        }
      },
      {
        "key": "D",
        "label": "直接把问题点写完整，免得下一个人也被创",
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
    "category": "formal",
    "title": "你刷到一张想要人数不高、但评论区有人狂夸“小动物小故事很有意思”的贴纸，会？",
    "options": [
      {
        "key": "A",
        "label": "没那么多人想要，多半算了",
        "score": {}
      },
      {
        "key": "B",
        "label": "先收藏，等别人再夸几轮",
        "score": {
          "G": 1
        }
      },
      {
        "key": "C",
        "label": "有点想试，这种冷门叙事我会多看两眼",
        "score": {
          "G": 2
        }
      },
      {
        "key": "D",
        "label": "越是这种偏门小世界，我越想亲自进去贴一遍",
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
    "category": "formal",
    "title": "看到一张贴纸拥有人数很高、评论数也高，但你还没收，你会？",
    "options": [
      {
        "key": "A",
        "label": "高就高吧，不代表我必须有",
        "score": {}
      },
      {
        "key": "B",
        "label": "先放愿望单，回头再看",
        "score": {
          "T": 1
        }
      },
      {
        "key": "C",
        "label": "会开始核对自己是不是缺这张",
        "score": {
          "T": 2
        }
      },
      {
        "key": "D",
        "label": "这种大家都有而我没有，会让我像库存掉队",
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
    "category": "formal",
    "title": "发现某张贴纸评论很多，但大家都只说“好看”，你通常会？",
    "options": [
      {
        "key": "A",
        "label": "无所谓，反正我自己判断",
        "score": {}
      },
      {
        "key": "B",
        "label": "点个收藏等更详细的人出现",
        "score": {
          "Q": 1
        }
      },
      {
        "key": "C",
        "label": "如果我用过，会补一条更具体的",
        "score": {
          "Q": 2
        }
      },
      {
        "key": "D",
        "label": "我会忍不住把尺寸、贴感、雷点一次说完",
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
    "category": "formal",
    "title": "真实数据里很多人会写“贴完会反复欣赏”，你更接近哪种心态？",
    "options": [
      {
        "key": "A",
        "label": "贴完就完了，下一张",
        "score": {}
      },
      {
        "key": "B",
        "label": "主要回看是不是贴整齐了",
        "score": {
          "R": 1
        }
      },
      {
        "key": "C",
        "label": "会回看那一页当时的气氛",
        "score": {
          "R": 2
        }
      },
      {
        "key": "D",
        "label": "会觉得那不是一张贴纸，是我那阵子的精神切片",
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
    "category": "chaos",
    "title": "如果一张普通街景贴到你手里，你最容易把它整成什么？",
    "options": [
      {
        "key": "A",
        "label": "还是普通街景",
        "score": {}
      },
      {
        "key": "B",
        "label": "普通街景 plus 一点顺眼摆位",
        "score": {
          "X": 1
        }
      },
      {
        "key": "C",
        "label": "深夜街头、小雨将至、路灯开麦",
        "score": {
          "X": 2
        }
      },
      {
        "key": "D",
        "label": "赛博贫民窟爱情开场前 3 秒",
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
    "category": "chaos",
    "title": "朋友说一张贴纸“绝美，闭眼冲”，你心里第一句通常是？",
    "options": [
      {
        "key": "A",
        "label": "好的好的",
        "score": {}
      },
      {
        "key": "B",
        "label": "你先别喊，我再看看",
        "score": {
          "D": 1
        }
      },
      {
        "key": "C",
        "label": "美在哪、难在哪、坑在哪，展开讲讲",
        "score": {
          "D": 2
        }
      },
      {
        "key": "D",
        "label": "闭眼冲的通常都是我睁眼避雷的对象",
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
    "category": "chaos",
    "title": "下面哪种标签最容易把你勾进去？",
    "options": [
      {
        "key": "A",
        "label": "治愈系百搭",
        "score": {}
      },
      {
        "key": "B",
        "label": "复古氛围感",
        "score": {
          "G": 1
        }
      },
      {
        "key": "C",
        "label": "阴湿、破碎、边角料文学",
        "score": {
          "G": 2
        }
      },
      {
        "key": "D",
        "label": "像做梦时捡来的怪图，但越看越上头",
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
    "category": "formal",
    "title": "你会不会在意一张贴纸的价格、尺寸和材质是否匹配？",
    "options": [
      {
        "key": "A",
        "label": "不太看，喜欢就买",
        "score": {}
      },
      {
        "key": "B",
        "label": "大概看一下，别太离谱",
        "score": {
          "T": 1
        }
      },
      {
        "key": "C",
        "label": "会结合尺寸和材质判断值不值",
        "score": {
          "T": 2
        }
      },
      {
        "key": "D",
        "label": "我脑子里甚至会自动算每平方厘米多少钱",
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
    "category": "formal",
    "title": "评论区有人问“这张到底值不值”，你更像哪种回复者？",
    "options": [
      {
        "key": "A",
        "label": "不回复",
        "score": {}
      },
      {
        "key": "B",
        "label": "回一句看你喜不喜欢图",
        "score": {
          "Q": 1
        }
      },
      {
        "key": "C",
        "label": "会告诉对方适合谁、不适合谁",
        "score": {
          "Q": 2
        }
      },
      {
        "key": "D",
        "label": "我会像客服下班后的人间说明书一样详细",
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
    "category": "chaos",
    "title": "有些人贴完会舍不得翻页，你更像？",
    "options": [
      {
        "key": "A",
        "label": "不存在，翻就翻了",
        "score": {}
      },
      {
        "key": "B",
        "label": "好看会多看两眼",
        "score": {
          "R": 1
        }
      },
      {
        "key": "C",
        "label": "会想把那页留久一点",
        "score": {
          "R": 2
        }
      },
      {
        "key": "D",
        "label": "那不是一页，是我亲手搭出来的情绪现场",
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
    "category": "formal",
    "title": "真实评论里经常提到“大块地板和壁纸容易出气泡”，这类贴纸你会怎么处理？",
    "options": [
      {
        "key": "A",
        "label": "避开，不想管",
        "score": {}
      },
      {
        "key": "B",
        "label": "慢一点贴，问题不大",
        "score": {
          "X": 1
        }
      },
      {
        "key": "C",
        "label": "先想好顺序、工具和留白再上手",
        "score": {
          "X": 2
        }
      },
      {
        "key": "D",
        "label": "我会把整页当施工现场，先布景再落贴",
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
    "category": "formal",
    "title": "遇到评论区常见的“无功无过，顺利贴完”，你会？",
    "options": [
      {
        "key": "A",
        "label": "挺好，省字",
        "score": {}
      },
      {
        "key": "B",
        "label": "觉得还差一点信息",
        "score": {
          "D": 1
        }
      },
      {
        "key": "C",
        "label": "想知道到底顺在哪里、平在哪里",
        "score": {
          "D": 2
        }
      },
      {
        "key": "D",
        "label": "这类点评在我眼里和没说差不多",
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
    "category": "random",
    "title": "你选贴纸时更像在选哪一种 BGM？",
    "options": [
      {
        "key": "A",
        "label": "热门榜单稳稳的",
        "score": {}
      },
      {
        "key": "B",
        "label": "轻松好听，不出错",
        "score": {
          "G": 1
        }
      },
      {
        "key": "C",
        "label": "有点怪，但越听越顺",
        "score": {
          "G": 2
        }
      },
      {
        "key": "D",
        "label": "像别人听了会问你最近精神还好吗的那种",
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
    "category": "formal",
    "title": "看到真实数据里的 `用时` 大多是 `1h / 2h / 3h`，你第一反应是？",
    "options": [
      {
        "key": "A",
        "label": "时间随缘",
        "score": {}
      },
      {
        "key": "B",
        "label": "大概知道别太晚开始就行",
        "score": {
          "T": 1
        }
      },
      {
        "key": "C",
        "label": "会预估今天有没有完整时间贴完",
        "score": {
          "T": 2
        }
      },
      {
        "key": "D",
        "label": "我连贴之前什么时候上厕所都想一并规划好",
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
    "category": "chaos",
    "title": "你安利一张贴纸时，更像哪种人？",
    "options": [
      {
        "key": "A",
        "label": "发个链接就跑",
        "score": {}
      },
      {
        "key": "B",
        "label": "说一句‘这张还行’",
        "score": {
          "Q": 1
        }
      },
      {
        "key": "C",
        "label": "会讲它为什么好贴、好看、好搭",
        "score": {
          "Q": 2
        }
      },
      {
        "key": "D",
        "label": "能从材质讲到人生，最后把人说到下单",
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
    "category": "formal",
    "title": "真实评论里常出现“图很漂亮，但人物形象让我扣分”，这最像你哪种状态？",
    "options": [
      {
        "key": "A",
        "label": "我一般不代入这些",
        "score": {}
      },
      {
        "key": "B",
        "label": "会轻微受影响",
        "score": {
          "R": 1
        }
      },
      {
        "key": "C",
        "label": "人物和情绪会影响我整页的感觉",
        "score": {
          "R": 2
        }
      },
      {
        "key": "D",
        "label": "只要画面气质不对，我整个人都贴不进去",
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
    "category": "random",
    "title": "如果你要给自己今天的贴纸 session 起一个名字，会更像？",
    "options": [
      {
        "key": "A",
        "label": "贴一下而已",
        "score": {}
      },
      {
        "key": "B",
        "label": "周末小手工",
        "score": {
          "X": 1
        }
      },
      {
        "key": "C",
        "label": "今晚有点想认真做一页",
        "score": {
          "X": 2
        }
      },
      {
        "key": "D",
        "label": "《一个人偷偷搭世界》特别篇",
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
    "category": "chaos",
    "title": "一张贴纸让你贴到一半想骂人时，你会怎么发言？",
    "options": [
      {
        "key": "A",
        "label": "忍住，不发",
        "score": {}
      },
      {
        "key": "B",
        "label": "吐槽一句有点烦",
        "score": {
          "D": 1
        }
      },
      {
        "key": "C",
        "label": "边骂边总结到底烦在哪",
        "score": {
          "D": 2
        }
      },
      {
        "key": "D",
        "label": "我会把它写成一份证据链完整的受害者陈述",
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
    "category": "formal",
    "title": "真实数据里有 `参考图清晰`、`遮挡部分看不清`、`整体看不清` 这类差异，你最在意哪种？",
    "options": [
      {
        "key": "A",
        "label": "都还好，能贴就行",
        "score": {}
      },
      {
        "key": "B",
        "label": "图别太糊就行",
        "score": {
          "G": 1
        }
      },
      {
        "key": "C",
        "label": "参考图只要不清楚，我兴趣会掉一半",
        "score": {
          "G": 2
        }
      },
      {
        "key": "D",
        "label": "参考图本身也是审美的一部分，糊就是气质塌了",
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
    "category": "formal",
    "title": "你会不会盯想要人数、已贴人数、拥有人数这种数据？",
    "options": [
      {
        "key": "A",
        "label": "完全不看",
        "score": {}
      },
      {
        "key": "B",
        "label": "偶尔看，图个参考",
        "score": {
          "T": 1
        }
      },
      {
        "key": "C",
        "label": "会拿来辅助判断是否值得收",
        "score": {
          "T": 2
        }
      },
      {
        "key": "D",
        "label": "这些数字像一套民意系统，我很难不看",
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
    "category": "formal",
    "title": "评论区有人只放图不写字，你通常会？",
    "options": [
      {
        "key": "A",
        "label": "图能看懂就行",
        "score": {}
      },
      {
        "key": "B",
        "label": "希望他至少写两句",
        "score": {
          "Q": 1
        }
      },
      {
        "key": "C",
        "label": "如果我也用过，会补文字说明",
        "score": {
          "Q": 2
        }
      },
      {
        "key": "D",
        "label": "我会恨不得替他把使用报告写完",
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
    "category": "random",
    "title": "你更容易因为什么对一张贴纸产生感情？",
    "options": [
      {
        "key": "A",
        "label": "没什么感情，工具而已",
        "score": {}
      },
      {
        "key": "B",
        "label": "因为它确实挺好看",
        "score": {
          "R": 1
        }
      },
      {
        "key": "C",
        "label": "因为它陪我完成了一页很顺的作品",
        "score": {
          "R": 2
        }
      },
      {
        "key": "D",
        "label": "因为它和我那天的状态绑定得过于牢固",
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
    "category": "chaos",
    "title": "如果一张贴纸本身平平无奇，你会怎么救？",
    "options": [
      {
        "key": "A",
        "label": "不救，随它去",
        "score": {}
      },
      {
        "key": "B",
        "label": "放角落里别太显眼",
        "score": {
          "X": 1
        }
      },
      {
        "key": "C",
        "label": "用背景纸和配件给它抬一下咖位",
        "score": {
          "X": 2
        }
      },
      {
        "key": "D",
        "label": "给它硬写一段世界观，把它捧成主角",
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
    "category": "formal",
    "title": "真实评论里常见的低分原因之一是“留胶、返工、气泡”，你写这类评价时更像？",
    "options": [
      {
        "key": "A",
        "label": "太麻烦了，不写",
        "score": {}
      },
      {
        "key": "B",
        "label": "简单提醒一句",
        "score": {
          "D": 1
        }
      },
      {
        "key": "C",
        "label": "会把问题出现的时机和后果写清楚",
        "score": {
          "D": 2
        }
      },
      {
        "key": "D",
        "label": "我连‘不到 5 分钟就留胶’这种证词都想保留下来",
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
    "category": "chaos",
    "title": "面对平台爆款，你更常见的心理活动是？",
    "options": [
      {
        "key": "A",
        "label": "爆就买，省心",
        "score": {}
      },
      {
        "key": "B",
        "label": "先看是不是确实好用",
        "score": {
          "G": 1
        }
      },
      {
        "key": "C",
        "label": "我会想找一个不那么撞的同类替身",
        "score": {
          "G": 2
        }
      },
      {
        "key": "D",
        "label": "它越爆，我越想去角落捡奇怪宝贝",
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
    "category": "random",
    "title": "如果你今天只剩 18 分钟空闲，你最可能？",
    "options": [
      {
        "key": "A",
        "label": "那就不贴了",
        "score": {}
      },
      {
        "key": "B",
        "label": "随手看两眼库存",
        "score": {
          "T": 1
        }
      },
      {
        "key": "C",
        "label": "挑一张短平快的先贴掉",
        "score": {
          "T": 2
        }
      },
      {
        "key": "D",
        "label": "18 分钟也够我盘一次想贴、拥有和未评三栏",
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
    "category": "chaos",
    "title": "当你发现一张冷门贴纸被误解了，你会？",
    "options": [
      {
        "key": "A",
        "label": "算了，路人甲自有命数",
        "score": {}
      },
      {
        "key": "B",
        "label": "小声说一句其实还行",
        "score": {
          "Q": 1
        }
      },
      {
        "key": "C",
        "label": "补一条评价给它正名",
        "score": {
          "Q": 2
        }
      },
      {
        "key": "D",
        "label": "我会像民间申冤人一样把它救回评论区",
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
    "category": "random",
    "title": "你删照片会手软，还是删已贴记录会手软？",
    "options": [
      {
        "key": "A",
        "label": "都不手软",
        "score": {}
      },
      {
        "key": "B",
        "label": "照片会留一点",
        "score": {
          "R": 1
        }
      },
      {
        "key": "C",
        "label": "已贴记录更容易让我犹豫",
        "score": {
          "R": 2
        }
      },
      {
        "key": "D",
        "label": "我对自己的贴纸痕迹有种离谱的考古感",
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
    "category": "formal",
    "title": "真实评论里常提到“辅助贴、刮板、硬卡”，你对工具的态度更像？",
    "options": [
      {
        "key": "A",
        "label": "有就用，没有也能贴",
        "score": {}
      },
      {
        "key": "B",
        "label": "大块素材时会想起来找",
        "score": {
          "X": 1
        }
      },
      {
        "key": "C",
        "label": "会按画面难度提前准备工具",
        "score": {
          "X": 2
        }
      },
      {
        "key": "D",
        "label": "工具不到位，我连开贴仪式都不完整",
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
    "category": "formal",
    "title": "碰到一条高分评论只写“超级美、放心入”，你会默认它是？",
    "options": [
      {
        "key": "A",
        "label": "正常夸夸",
        "score": {}
      },
      {
        "key": "B",
        "label": "有参考价值，但不多",
        "score": {
          "D": 1
        }
      },
      {
        "key": "C",
        "label": "需要结合标签和其他评论一起看",
        "score": {
          "D": 2
        }
      },
      {
        "key": "D",
        "label": "这是典型快乐发言，不是有效情报",
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
    "category": "random",
    "title": "你更愿意贴哪种“怪东西”？",
    "options": [
      {
        "key": "A",
        "label": "最好别怪",
        "score": {}
      },
      {
        "key": "B",
        "label": "小怪可以，大怪不行",
        "score": {
          "G": 1
        }
      },
      {
        "key": "C",
        "label": "怪得有细节，我会喜欢",
        "score": {
          "G": 2
        }
      },
      {
        "key": "D",
        "label": "越像梦里捡来的，越让我想试",
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
    "category": "chaos",
    "title": "你有没有过这种瞬间：凌晨突然想起某张贴纸还没补评？",
    "options": [
      {
        "key": "A",
        "label": "没有，我心态稳定",
        "score": {}
      },
      {
        "key": "B",
        "label": "想起过，但又睡了",
        "score": {
          "T": 1
        }
      },
      {
        "key": "C",
        "label": "会记到明天待办里",
        "score": {
          "T": 2
        }
      },
      {
        "key": "D",
        "label": "会像忘了关煤气一样瞬间坐起来",
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
    "category": "formal",
    "title": "真实数据里有的贴纸评论数很高，但高质量评论比例不一定高。你会？",
    "options": [
      {
        "key": "A",
        "label": "数量多就够看了",
        "score": {}
      },
      {
        "key": "B",
        "label": "挑顺眼的看几条",
        "score": {
          "Q": 1
        }
      },
      {
        "key": "C",
        "label": "更愿意找带图、带标签、带细节的评论",
        "score": {
          "Q": 2
        }
      },
      {
        "key": "D",
        "label": "我自己就想成为那种别人会重点看的评论作者",
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
    "category": "chaos",
    "title": "如果某张贴纸特别适合你最近的精神状态，你会？",
    "options": [
      {
        "key": "A",
        "label": "也就那样",
        "score": {}
      },
      {
        "key": "B",
        "label": "觉得‘嗯，挺像我最近’",
        "score": {
          "R": 1
        }
      },
      {
        "key": "C",
        "label": "会专门找时间认真贴它",
        "score": {
          "R": 2
        }
      },
      {
        "key": "D",
        "label": "我会把那页当成本周情绪纪念碑",
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
    "category": "random",
    "title": "你上厕所时最像哪种贴纸玩家？",
    "options": [
      {
        "key": "A",
        "label": "进去就出来，不想别的",
        "score": {}
      },
      {
        "key": "B",
        "label": "会顺手想一下今天贴哪张",
        "score": {
          "X": 1
        }
      },
      {
        "key": "C",
        "label": "可能已经在脑补版面顺序",
        "score": {
          "X": 2
        }
      },
      {
        "key": "D",
        "label": "出来时连前景后景怎么叠都想好了",
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
    "category": "random",
    "title": "你和朋友聊天时，最像哪种点评风格？",
    "options": [
      {
        "key": "A",
        "label": "主打和气生财",
        "score": {}
      },
      {
        "key": "B",
        "label": "会轻微保留态度",
        "score": {
          "D": 1
        }
      },
      {
        "key": "C",
        "label": "愿意讲逻辑，但尽量不伤人",
        "score": {
          "D": 2
        }
      },
      {
        "key": "D",
        "label": "我嘴可能损，但论据一般比感情多",
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
    "category": "formal",
    "title": "真实贴纸里从 `MINI` 到长条大尺寸都有，你对尺寸的偏好更像？",
    "options": [
      {
        "key": "A",
        "label": "越常规越好",
        "score": {}
      },
      {
        "key": "B",
        "label": "稍微特别一点也行",
        "score": {
          "G": 1
        }
      },
      {
        "key": "C",
        "label": "尺寸一怪，玩法就会更有意思",
        "score": {
          "G": 2
        }
      },
      {
        "key": "D",
        "label": "我甚至会因为尺寸离谱而高看它一眼",
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
    "category": "random",
    "title": "月底你更可能盘点哪件事？",
    "options": [
      {
        "key": "A",
        "label": "什么都不盘",
        "score": {}
      },
      {
        "key": "B",
        "label": "大概看下花了多少",
        "score": {
          "T": 1
        }
      },
      {
        "key": "C",
        "label": "会看哪些想贴还没动",
        "score": {
          "T": 2
        }
      },
      {
        "key": "D",
        "label": "价格、数量、进度、遗憾，一样都不想放过",
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

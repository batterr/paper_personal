export type PersonalityDimensionKey = "buy" | "paste" | "review" | "keep";
export type QuizOptionKey = "A" | "B" | "C" | "D";

export type PersonalityDimension = {
  key: PersonalityDimensionKey;
  label: string;
  highLabel: string;
  lowLabel: string;
};

export type PersonalityOption = {
  key: "A" | "B";
  label: string;
  score: 0 | 1;
};

export type PersonalityQuestion = {
  id: string;
  type: "personality";
  dimension: PersonalityDimensionKey;
  title: string;
  options: PersonalityOption[];
};

export type StyleQuestion = {
  id: string;
  type: "style";
  title: string;
  options: string[];
  keywordMapping: string[][];
};

export type AddictionQuestion = {
  id: string;
  type: "addiction";
  title: string;
  options: string[];
  scores: number[];
};

export type QuizItem = PersonalityQuestion | StyleQuestion | AddictionQuestion;

export const personalityDimensions: PersonalityDimension[] = [
  {
    key: "buy",
    label: "购买动机",
    highLabel: "冲评先锋",
    lowLabel: "谨慎记录",
  },
  {
    key: "paste",
    label: "粘贴偏好",
    highLabel: "无脑爽派",
    lowLabel: "放着我来",
  },
  {
    key: "review",
    label: "点评深度",
    highLabel: "话痨输出",
    lowLabel: "潜水观察",
  },
  {
    key: "keep",
    label: "成品处理",
    highLabel: "珍藏供起",
    lowLabel: "用完即弃",
  },
];

export const dimensionLabels: Record<PersonalityDimensionKey, string> =
  Object.fromEntries(personalityDimensions.map((dimension) => [dimension.key, dimension.label])) as Record<
    PersonalityDimensionKey,
    string
  >;

export const personalityQuestionGroups: Record<PersonalityDimensionKey, PersonalityQuestion[]> = {
  buy: [
    {
      id: "BUY1",
      type: "personality",
      dimension: "buy",
      title: "你发点评的动力主要来自：",
      options: [
        { key: "A", label: "想被夸“好快好客观，看了你才敢放心买”", score: 1 },
        { key: "B", label: "单纯想记录自己贴过啥，没人看也行，就当电子日记", score: 0 },
      ],
    },
    {
      id: "BUY2",
      type: "personality",
      dimension: "buy",
      title: "你买贴纸的钱包额度主要贡献给了：",
      options: [
        { key: "A", label: "新款爆款美貌款我就无脑冲，来不及刷券了快上车", score: 1 },
        { key: "B", label: "等券刷券，绝不让品牌方占便宜", score: 0 },
      ],
    },
    {
      id: "BUY3",
      type: "personality",
      dimension: "buy",
      title: "如果有一款贴纸采用了新工艺比如“贝壳光”“无边贴纸”之类，但画风一般，你：",
      options: [
        { key: "A", label: "买！为了体验新工艺和分享体验", score: 1 },
        { key: "B", label: "不买，画风不对胃口绝不将就", score: 0 },
      ],
    },
    {
      id: "BUY4",
      type: "personality",
      dimension: "buy",
      title: "你觉得自己在贴纸圈更像：",
      options: [
        { key: "A", label: "冲就完了，永远冲在尝鲜第一线", score: 1 },
        { key: "B", label: "等等党永不为奴，等前方避雷完毕再入场", score: 0 },
      ],
    },
    {
      id: "BUY5",
      type: "personality",
      dimension: "buy",
      title: "如果朋友向你推荐一张贴纸，你会：",
      options: [
        { key: "A", label: "买买买！我将激情购入", score: 1 },
        { key: "B", label: "我查一下纸评评分搜搜测评先", score: 0 },
      ],
    },
  ],
  paste: [
    {
      id: "PASTE1",
      type: "personality",
      dimension: "paste",
      title: "便利店的码货贴纸，你希望：",
      options: [
        { key: "A", label: "每瓶都是单身贵族，一瓶一贴才耐玩", score: 0 },
        { key: "B", label: "五瓶挤一张，省事整齐好刷剧", score: 1 },
      ],
    },
    {
      id: "PASTE2",
      type: "personality",
      dimension: "paste",
      title: "商家只给大块物品做了定位线，你的第一反应：",
      options: [
        { key: "A", label: "品牌方在偷懒，避雷避雷", score: 1 },
        { key: "B", label: "太好了，我可以不用反复比对定位线，随风奔跑自由是方向", score: 0 },
      ],
    },
    {
      id: "PASTE3",
      type: "personality",
      dimension: "paste",
      title: "你粘贴时更享受：",
      options: [
        { key: "A", label: "严格按示意图，成品和例图一模一样，强迫症圆寂", score: 1 },
        { key: "B", label: "随性发挥，加私货，让成品变成“我的版本”", score: 0 },
      ],
    },
    {
      id: "PASTE4",
      type: "personality",
      dimension: "paste",
      title: "你更愿意贴哪种贴纸？",
      options: [
        { key: "A", label: "有超详细说明书，甚至标注“此处建议横向排废”", score: 1 },
        { key: "B", label: "只有一张参考图，剩下的靠自己悟，像解谜游戏", score: 0 },
      ],
    },
    {
      id: "PASTE5",
      type: "personality",
      dimension: "paste",
      title: "你更喜欢哪种挑战？",
      options: [
        { key: "A", label: "无脑爽贴，闭眼也能成景", score: 1 },
        { key: "B", label: "高难度结构，需要研究半天才能下手，贴完智商+1", score: 0 },
      ],
    },
  ],
  review: [
    {
      id: "REVIEW1",
      type: "personality",
      dimension: "review",
      title: "如果你遇到一张惊天雷贴纸，你会：",
      options: [
        { key: "A", label: "默默拉黑，最多会在小程序打个低分和选择参考标签", score: 0 },
        { key: "B", label: "写一篇《避雷指南》，发纸评发笔记发朋友吐槽还想转发到全世界的贴纸群", score: 1 },
      ],
    },
    {
      id: "REVIEW2",
      type: "personality",
      dimension: "review",
      title: "你会特意为点评配图吗？",
      options: [
        { key: "A", label: "懒得拍，文字说清楚就行（其实也就一两句）", score: 0 },
        { key: "B", label: "必须拍，无图算什么点评，还要标出雷点位置", score: 1 },
      ],
    },
    {
      id: "REVIEW3",
      type: "personality",
      dimension: "review",
      title: "看到一条高赞但没什么内容的点评（比如“绝美”），你：",
      options: [
        { key: "A", label: "点赞高自有道理，可能人家就是美到词穷", score: 0 },
        { key: "B", label: "内心吐槽：这也能上热评？", score: 1 },
      ],
    },
    {
      id: "REVIEW4",
      type: "personality",
      dimension: "review",
      title: "你会在意自己的点评有没有被别人点赞或评价吗？",
      options: [
        { key: "A", label: "完全不在意，发完就失忆", score: 0 },
        { key: "B", label: "超在意，看到小红点会暗爽", score: 1 },
      ],
    },
    {
      id: "REVIEW5",
      type: "personality",
      dimension: "review",
      title: "如果小程序上线“点评被点赞数排行榜”，你：",
      options: [
        { key: "A", label: "围观一下", score: 0 },
        { key: "B", label: "会想冲榜，争取当点评王", score: 1 },
      ],
    },
  ],
  keep: [
    {
      id: "KEEP1",
      type: "personality",
      dimension: "keep",
      title: "贴完一张贴纸后，你通常：",
      options: [
        { key: "A", label: "至此艺术已成！拍照，收进收纳册供着，可能还要发点评发笔记分享", score: 1 },
        { key: "B", label: "至此爱情已过，下一张更香，塞进抽屉或直接扔", score: 0 },
      ],
    },
    {
      id: "KEEP2",
      type: "personality",
      dimension: "keep",
      title: "收到新的贴纸时，你会：",
      options: [
        { key: "A", label: "分门别类放进我的贴纸囤货区，小程序也要做好收纳标记，还要写清楚价格，收纳仓+1", score: 1 },
        { key: "B", label: "堆进囤货抽屉就行，有一天缘分会让我们重逢", score: 0 },
      ],
    },
    {
      id: "KEEP3",
      type: "personality",
      dimension: "keep",
      title: "你更认同哪句话？",
      options: [
        { key: "A", label: "贴纸是时间的容器，每张成品都是回忆", score: 1 },
        { key: "B", label: "贴纸是消费品，快乐只在排废时刻和粘贴时光里", score: 0 },
      ],
    },
    {
      id: "KEEP4",
      type: "personality",
      dimension: "keep",
      title: "如果你搬家，你会如何处理你的贴纸成品？",
      options: [
        { key: "A", label: "全部打包带走，一件不能少", score: 1 },
        { key: "B", label: "拍照留念后，含泪丢弃或送人，我的征途是星辰大海", score: 0 },
      ],
    },
    {
      id: "KEEP5",
      type: "personality",
      dimension: "keep",
      title: "你会时不时翻看之前贴好的成品吗：",
      options: [
        { key: "A", label: "会，每次翻看都能重温当时的快乐，像翻老照片", score: 1 },
        { key: "B", label: "几乎不看，贴完就压箱底了", score: 0 },
      ],
    },
  ],
};

export const styleQuestions: StyleQuestion[] = [
  {
    id: "STYLE1",
    type: "style",
    title: "你更容易被哪种贴纸场景吸引？（可多选）",
    options: [
      "整齐的便利店，货架上摆满一摞摞饮料和零食，强迫症福音",
      "深秋路旁，落叶、长椅、路灯，下着小雨，氛围感十足",
      "堆满古董的阁楼，繁复花边的衣裙和中古花瓶，安静的下午茶时间",
      "挂满齿轮和蒸汽管道的机械工坊，仪表盘还在跳动，移动城堡就在眼前",
    ],
    keywordMapping: [["码货"], ["插画风"], ["复古"], ["蒸汽朋克", "幻想主义"]],
  },
  {
    id: "STYLE2",
    type: "style",
    title: "你更向往哪种氛围？（可多选）",
    options: [
      "宫崎骏动画里的森林，有小精灵和龙猫",
      "哥特式暗黑城堡，蜡烛在滴血，窗外是雷雨",
      "中式古风书房，水墨画、茶具、竹帘",
      "开满鲜花的治愈系田园，有风车和小木屋",
    ],
    keywordMapping: [["幻想主义", "插画风"], ["暗黑微恐"], ["古风"], ["治愈系", "插画风"]],
  },
  {
    id: "STYLE3",
    type: "style",
    title: "哪种贴纸会让你着迷？（可多选）",
    options: [
      "未来世界、飞船、星云，宇宙从不是漆黑一片寂静无声",
      "贝壳光、夜光或温变材质，沉迷在特材带来的眼花缭乱",
      "街道上的百态众生",
      "可可爱爱的小动物、玩偶，住在梦幻的小房子里",
    ],
    keywordMapping: [["幻想主义"], ["新奇体验"], ["街景"], ["可爱风"]],
  },
  {
    id: "STYLE4",
    type: "style",
    title: "你更爱哪种呈现？（可多选）",
    options: [
      "大建筑里很多小房间，每个房间都有不同故事",
      "极繁细节爆炸，画面里藏着无数小故事",
      "立体相框，贴纸真的凸出来，像微缩景观",
      "一点点布置好小房间，幻想自己住进去",
    ],
    keywordMapping: [["格子间"], ["极繁主义"], ["新奇体验"], ["小屋"]],
  },
];

export const addictionQuestions: AddictionQuestion[] = [
  {
    id: "ADDICTION1",
    type: "addiction",
    title: "只剩18分钟空闲，你的内心戏是：",
    options: ["18分钟也够我贴一半背景，造景贴纸我来了", "碎片时间不开工，凑够整块时间再玩"],
    scores: [1, 0],
  },
  {
    id: "ADDICTION2",
    type: "addiction",
    title: "你玩贴纸的频率是：",
    options: ["几乎每天都要玩，像吃饭喝水一样自然", "一周玩几天，或者一个月两三次，啥时候想起啥时候玩"],
    scores: [1, 0],
  },
  {
    id: "ADDICTION3",
    type: "addiction",
    title: "遇到特别喜欢的贴纸，你会：",
    options: ["上头到重复购入，再体验一遍爽感或收藏", "从不重复，一张就够了"],
    scores: [1, 0],
  },
  {
    id: "ADDICTION4",
    type: "addiction",
    title: "为了贴纸，你愿意做出哪种“牺牲”？",
    options: [
      "贴纸而已，用来填充休闲时间即可，不值得我牺牲任何东西",
      "偶尔上头多ALL了几套，牺牲一顿火锅钱，但绝不会专门挪时间来玩",
      "我已由追剧改为“听剧”，游戏也排在了贴纸后面，不过社交和睡眠不能丢",
      "火锅可以不吃，朋友可以不见，觉可以不睡，Dream world我来了！",
    ],
    scores: [0, 1, 2, 3],
  },
];

export const personalityQuestions: PersonalityQuestion[] = Object.values(personalityQuestionGroups).flat();
export const allQuizItems: QuizItem[] = [
  ...personalityQuestions,
  ...styleQuestions,
  ...addictionQuestions,
];

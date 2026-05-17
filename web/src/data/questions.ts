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
  required?: boolean;
  title: string;
  options: QuizOption[];
};

export type HiddenQuestion = {
  id: string;
  type: "hidden";
  trigger: string;
  required?: boolean;
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
    id: "Q1",
    type: "main",
    dimension: "X",
    category: "formal",
    title: "你准备贴一页“雨夜小店”，但手边没有雨滴素材，你会？",
    options: [
      { key: "A", label: "换主题，不硬凑", score: {} },
      { key: "B", label: "用透明边角、碎花、文字贴假装下雨", score: { X: 3 } },
      { key: "C", label: "直接把小店改成“雨后刚停”", score: { X: 2 } },
      { key: "D", label: "先放着，等买到合适素材再开工", score: { X: 1 } },
    ],
  },
  {
    id: "Q2",
    type: "main",
    dimension: "D",
    category: "formal",
    title: "一张贴纸图很好看，但割线明显不顺，你会怎么评价？",
    options: [
      { key: "A", label: "图好看就够了，割线我会忍", score: {} },
      { key: "B", label: "会提醒一句：好看，但不适合新手", score: { D: 2 } },
      { key: "C", label: "会把难撕、难贴、哪里翻车写清楚", score: { D: 3 } },
      { key: "D", label: "我会先看别人有没有同样问题再下判断", score: { D: 1 } },
    ],
  },
  {
    id: "Q3",
    type: "main",
    dimension: "G",
    category: "formal",
    title: "你刷到一张想要人数很低、但主题像“废弃车站卖花”的贴纸，会？",
    options: [
      { key: "A", label: "太冷了，先划走", score: {} },
      { key: "B", label: "收藏，等哪天有类似场景再说", score: { G: 1 } },
      { key: "C", label: "这种题材反而让我想试", score: { G: 3 } },
      { key: "D", label: "会先翻评论看有没有人贴出过成品", score: { G: 2 } },
    ],
  },
  {
    id: "Q4",
    type: "main",
    dimension: "T",
    category: "formal",
    title: "“我会因为缺一张关键背景贴，整页都不开工。”",
    options: [
      { key: "A", label: "不赞同，缺什么就用别的顶上", score: {} },
      { key: "B", label: "赞同，关键素材缺了就是缺了", score: { T: 3 } },
    ],
  },
  {
    id: "Q5",
    type: "main",
    dimension: "Q",
    category: "formal",
    title: "朋友问你“新手适合买哪种造景贴纸”，你会？",
    options: [
      { key: "A", label: "直接丢几张稳妥爆款", score: { Q: 1 } },
      { key: "B", label: "按预算、尺寸、难度分层推荐", score: { Q: 3 } },
      { key: "C", label: "先问对方想贴什么氛围", score: { Q: 2 } },
      { key: "D", label: "不太推荐，怕背锅", score: {} },
    ],
  },
  {
    id: "Q6",
    type: "main",
    dimension: "R",
    category: "formal",
    title: "一页贴完后，你发现它很像你最近的状态，你会？",
    options: [
      { key: "A", label: "贴完就翻页，不多想", score: {} },
      { key: "B", label: "默默拍下来存着", score: { R: 2 } },
      { key: "C", label: "配一段文字发给熟人看", score: { R: 3 } },
      { key: "D", label: "会觉得巧，但不想解释", score: { R: 1 } },
    ],
  },
  {
    id: "Q7",
    type: "main",
    dimension: "X",
    category: "chaos",
    title: "贴到一半发现人物比例太大，压住了整个场景，你会？",
    options: [
      { key: "A", label: "撕掉重来", score: {} },
      { key: "B", label: "让它变成主角特写", score: { X: 3 } },
      { key: "C", label: "用前景遮挡救一下", score: { X: 2 } },
      { key: "D", label: "拍照留念，当翻车案例", score: { X: 1 } },
    ],
  },
  {
    id: "Q8",
    type: "main",
    dimension: "D",
    category: "chaos",
    required: false,
    title: "朋友贴了一页但明显翻车，问你好不好看，你会？",
    options: [
      { key: "A", label: "先夸情绪价值", score: {} },
      { key: "B", label: "委婉说哪里能调整", score: { D: 1 } },
      { key: "C", label: "直接指出最大问题", score: { D: 3 } },
      { key: "D", label: "先问他想表达什么，再判断", score: { D: 2 } },
    ],
  },
  {
    id: "Q9",
    type: "main",
    dimension: "G",
    category: "chaos",
    title: "你最容易被哪种贴纸标题勾住？",
    options: [
      { key: "A", label: "日常百搭小物", score: {} },
      { key: "B", label: "雨天旧书店", score: { G: 1 } },
      { key: "C", label: "废墟花房营业中", score: { G: 3 } },
      { key: "D", label: "奶油色温柔房间", score: { G: 2 } },
    ],
  },
  {
    id: "Q10",
    type: "main",
    dimension: "T",
    category: "formal",
    title: "“我宁愿贴得慢，也不想浪费一张好素材。”",
    options: [
      { key: "A", label: "不赞同，素材就是拿来用的", score: {} },
      { key: "B", label: "赞同，好素材必须等好状态", score: { T: 3 } },
    ],
  },
  {
    id: "Q11",
    type: "main",
    dimension: "Q",
    category: "formal",
    title: "别人说“这张好像不好搭”，你会？",
    options: [
      { key: "A", label: "尊重，搭不搭各凭本事", score: {} },
      { key: "B", label: "给他看一个可行搭配", score: { Q: 2 } },
      { key: "C", label: "直接讲适合什么主题、避开什么坑", score: { Q: 3 } },
      { key: "D", label: "会说一句“确实挑人”", score: { Q: 1 } },
    ],
  },
  {
    id: "Q12",
    type: "main",
    dimension: "R",
    category: "chaos",
    required: false,
    title: "“我会把某一页贴纸当成一段时间的纪念。”",
    options: [
      { key: "A", label: "不赞同，作品和生活分得开", score: {} },
      { key: "B", label: "赞同，有些页确实会绑定记忆", score: { R: 3 } },
    ],
  },
  {
    id: "Q13",
    type: "main",
    dimension: "X",
    category: "formal",
    title: "一张贴纸里有背景、人物、小道具，你通常先动哪一层？",
    options: [
      { key: "A", label: "先贴最喜欢的那张", score: {} },
      { key: "B", label: "先定背景和地面", score: { X: 2 } },
      { key: "C", label: "先确定主角站位", score: { X: 1 } },
      { key: "D", label: "先想前中后景关系", score: { X: 3 } },
    ],
  },
  {
    id: "Q14",
    type: "main",
    dimension: "D",
    category: "formal",
    title: "看到评论只写“好看，冲”，你通常会？",
    options: [
      { key: "A", label: "够了，好看就是信息", score: {} },
      { key: "B", label: "想知道材质、尺寸、贴感", score: { D: 2 } },
      { key: "C", label: "我会继续找带图实贴", score: { D: 1 } },
      { key: "D", label: "这种评论对我等于没写", score: { D: 3 } },
    ],
  },
  {
    id: "Q15",
    type: "main",
    dimension: "G",
    category: "random",
    title: "只能选一张进收纳册，你更想留哪张？",
    options: [
      { key: "A", label: "稳定百搭的窗户背景", score: {} },
      { key: "B", label: "有点奇怪但能做出故事的门牌", score: { G: 2 } },
      { key: "C", label: "看不懂但忘不掉的小怪物", score: { G: 3 } },
      { key: "D", label: "大家都在用的热门人物", score: { G: 1 } },
    ],
  },
  {
    id: "Q16",
    type: "main",
    dimension: "T",
    category: "formal",
    required: false,
    title: "你收纳贴纸更接近哪种逻辑？",
    options: [
      { key: "A", label: "按品牌/店铺", score: { T: 2 } },
      { key: "B", label: "按主题/场景", score: { T: 1 } },
      { key: "C", label: "按已用/未用/待评", score: { T: 3 } },
      { key: "D", label: "不怎么收纳，能找到就行", score: {} },
    ],
  },
  {
    id: "Q17",
    type: "main",
    dimension: "Q",
    category: "chaos",
    title: "你发现一张冷门贴纸被大家误解成“不好用”，你会？",
    options: [
      { key: "A", label: "随缘，它自有命数", score: {} },
      { key: "B", label: "小声说一句其实还行", score: { Q: 1 } },
      { key: "C", label: "补一条搭配图给它正名", score: { Q: 3 } },
      { key: "D", label: "发给熟人说“你们看它不是废物”", score: { Q: 2 } },
    ],
  },
  {
    id: "Q18",
    type: "main",
    dimension: "R",
    category: "formal",
    title: "你更容易因为什么对一张贴纸产生感情？",
    options: [
      { key: "A", label: "没什么感情，素材而已", score: {} },
      { key: "B", label: "它帮我完成了一页很顺的作品", score: { R: 2 } },
      { key: "C", label: "它刚好贴中了那天的心情", score: { R: 3 } },
      { key: "D", label: "因为它实物比预期更好看", score: { R: 1 } },
    ],
  },
  {
    id: "Q19",
    type: "main",
    dimension: "X",
    category: "random",
    title: "如果平台发起“只用 5 张贴纸完成一页”的挑战，你会？",
    options: [
      { key: "A", label: "不参加，限制太多", score: {} },
      { key: "B", label: "先规划结构再动手", score: { X: 3 } },
      { key: "C", label: "边贴边试，限制反而有趣", score: { X: 2 } },
      { key: "D", label: "先看别人怎么贴再决定", score: { X: 1 } },
    ],
  },
  {
    id: "Q20",
    type: "main",
    dimension: "D",
    category: "chaos",
    title: "你贴到一半想骂一张贴纸时，最可能骂什么？",
    options: [
      { key: "A", label: "算了，不骂", score: {} },
      { key: "B", label: "“你怎么这么难撕”", score: { D: 1 } },
      { key: "C", label: "“图好看，贴感像惩罚”", score: { D: 2 } },
      { key: "D", label: "“这个设计逻辑应该被写进避雷教材”", score: { D: 3 } },
    ],
  },
  {
    id: "Q21",
    type: "main",
    dimension: "G",
    category: "formal",
    required: false,
    title: "“我会因为一张贴纸尺寸很怪，反而更想试。”",
    options: [
      { key: "A", label: "不赞同，尺寸怪就是麻烦", score: {} },
      { key: "B", label: "赞同，尺寸怪会逼出新玩法", score: { G: 3 } },
    ],
  },
  {
    id: "Q22",
    type: "main",
    dimension: "T",
    category: "formal",
    title: "你最容易被哪种收纳状态逼疯？",
    options: [
      { key: "A", label: "想用时找不到", score: { T: 3 } },
      { key: "B", label: "同主题散在不同地方", score: { T: 2 } },
      { key: "C", label: "买了但忘记自己买过", score: { T: 3 } },
      { key: "D", label: "不太会疯，乱一点也能活", score: {} },
    ],
  },
  {
    id: "Q23",
    type: "main",
    dimension: "Q",
    category: "formal",
    title: "别人只发造景图不写用材，你会？",
    options: [
      { key: "A", label: "图能看懂就够了", score: {} },
      { key: "B", label: "希望他至少写一下主素材", score: { Q: 1 } },
      { key: "C", label: "我会在评论区问链接", score: { Q: 2 } },
      { key: "D", label: "如果是我发，我会把用材写清楚", score: { Q: 3 } },
    ],
  },
  {
    id: "Q24",
    type: "main",
    dimension: "R",
    category: "random",
    title: "你开贴前更像哪种状态？",
    options: [
      { key: "A", label: "就是想消耗一下素材", score: {} },
      { key: "B", label: "今天情绪到了，想贴一页", score: { R: 3 } },
      { key: "C", label: "想完成一个早就想贴的主题", score: { R: 2 } },
      { key: "D", label: "看桌面上先翻到哪张", score: { R: 1 } },
    ],
  },
  {
    id: "Q25",
    type: "main",
    dimension: "X",
    category: "chaos",
    title: "一张平平无奇的椅子贴纸，你会怎么救？",
    options: [
      { key: "A", label: "不救，放边上", score: {} },
      { key: "B", label: "放进房间角落当背景", score: { X: 1 } },
      { key: "C", label: "给它配一盏灯和一本书", score: { X: 2 } },
      { key: "D", label: "让它成为“有人刚离开”的剧情证据", score: { X: 3 } },
    ],
  },
  {
    id: "Q26",
    type: "main",
    dimension: "D",
    category: "formal",
    title: "实物和商家图有色差，你会怎么处理评价？",
    options: [
      { key: "A", label: "算了，色差很常见", score: {} },
      { key: "B", label: "简单说一句实物偏色", score: { D: 1 } },
      { key: "C", label: "会放对比图说明差异", score: { D: 3 } },
      { key: "D", label: "会看色差是否影响造景再评价", score: { D: 2 } },
    ],
  },
  {
    id: "Q27",
    type: "main",
    dimension: "G",
    category: "chaos",
    title: "平台爆款刷屏时，你更像？",
    options: [
      { key: "A", label: "爆款省心，跟着买", score: {} },
      { key: "B", label: "先看它到底适合什么场景", score: { G: 1 } },
      { key: "C", label: "想找一个不撞款的替身", score: { G: 2 } },
      { key: "D", label: "它越爆，我越想去角落挖怪东西", score: { G: 3 } },
    ],
  },
  {
    id: "Q28",
    type: "main",
    dimension: "T",
    category: "random",
    required: false,
    title: "“只剩 18 分钟空闲，我也会想碰一下贴纸。”",
    options: [
      { key: "A", label: "不赞同，碎片时间不开工", score: {} },
      { key: "B", label: "赞同，18 分钟也能整理想贴/未用/待评", score: { T: 3 } },
    ],
  },
  {
    id: "Q29",
    type: "main",
    dimension: "Q",
    category: "chaos",
    title: "你参加造景挑战时，更像？",
    options: [
      { key: "A", label: "默默看，不一定交作业", score: {} },
      { key: "B", label: "按规则认真贴完", score: { Q: 1 } },
      { key: "C", label: "贴完会看大家作业，顺便互动", score: { Q: 2 } },
      { key: "D", label: "会顺手写规则、素材、避雷和心得", score: { Q: 3 } },
    ],
  },
  {
    id: "Q30",
    type: "main",
    dimension: "R",
    category: "random",
    title: "你删照片会手软，还是删已贴记录会手软？",
    options: [
      { key: "A", label: "都不手软", score: {} },
      { key: "B", label: "照片会留一点", score: { R: 1 } },
      { key: "C", label: "已贴记录更容易让我犹豫", score: { R: 2 } },
      { key: "D", label: "我对自己的贴纸痕迹有种考古感", score: { R: 3 } },
    ],
  },
  {
    id: "Q31",
    type: "main",
    dimension: "X",
    category: "formal",
    title: "大块地板贴容易出气泡，你会？",
    options: [
      { key: "A", label: "能避开就避开", score: {} },
      { key: "B", label: "慢慢贴，翻车就算了", score: { X: 1 } },
      { key: "C", label: "先准备刮板和贴顺序", score: { X: 2 } },
      { key: "D", label: "把它当施工现场，先铺底再布景", score: { X: 3 } },
    ],
  },
  {
    id: "Q32",
    type: "main",
    dimension: "D",
    category: "formal",
    required: false,
    title: "“高分评论只写‘超级美、放心入’，对我来说信息量不够。”",
    options: [
      { key: "A", label: "不赞同，这种夸夸也有用", score: {} },
      { key: "B", label: "赞同，我会继续找更具体的评价", score: { D: 3 } },
    ],
  },
  {
    id: "Q33",
    type: "main",
    dimension: "G",
    category: "random",
    title: "你更愿意贴哪种“怪东西”？",
    options: [
      { key: "A", label: "最好别怪", score: {} },
      { key: "B", label: "小怪可以，大怪不行", score: { G: 1 } },
      { key: "C", label: "怪得有细节，我会喜欢", score: { G: 2 } },
      { key: "D", label: "越像梦里捡来的，越让我想试", score: { G: 3 } },
    ],
  },
  {
    id: "Q34",
    type: "main",
    dimension: "T",
    category: "chaos",
    title: "“凌晨突然想起某张贴纸还没补评，我会被它烦到。”",
    options: [
      { key: "A", label: "不赞同，明天再说也不会怎样", score: {} },
      { key: "B", label: "赞同，想起来那刻已经像库存警报", score: { T: 3 } },
    ],
  },
  {
    id: "Q35",
    type: "main",
    dimension: "Q",
    category: "formal",
    title: "你最想给贴纸评论区补充哪类信息？",
    options: [
      { key: "A", label: "实物颜色和商家图差异", score: { Q: 2 } },
      { key: "B", label: "适合搭什么场景", score: { Q: 3 } },
      { key: "C", label: "贴感、割线、会不会留胶", score: { Q: 2 } },
      { key: "D", label: "不太想补，已有评论够看就行", score: {} },
    ],
  },
  {
    id: "Q36",
    type: "main",
    dimension: "R",
    category: "chaos",
    title: "如果某张贴纸特别适合你最近的精神状态，你会？",
    options: [
      { key: "A", label: "也就那样", score: {} },
      { key: "B", label: "觉得“嗯，挺像我最近”", score: { R: 1 } },
      { key: "C", label: "会专门找时间认真贴它", score: { R: 2 } },
      { key: "D", label: "我会把那页当成本周情绪纪念碑", score: { R: 3 } },
    ],
  },
  {
    id: "Q37",
    type: "main",
    dimension: "X",
    category: "random",
    title: "你做梦时，最可能梦到哪种贴纸相关场景？",
    options: [
      { key: "A", label: "基本不会梦到，睡觉就是黑屏", score: {} },
      { key: "B", label: "梦到自己在挑今天先贴哪张", score: { X: 1 } },
      { key: "C", label: "梦到一整页版面自己排列组合", score: { X: 2 } },
      { key: "D", label: "梦到完整小世界，醒来还想真的贴出来", score: { X: 3 } },
    ],
  },
  {
    id: "Q38",
    type: "main",
    dimension: "D",
    category: "random",
    title: "你和朋友聊贴纸时，最像哪种点评风格？",
    options: [
      { key: "A", label: "主打和气生财", score: {} },
      { key: "B", label: "会轻微保留态度", score: { D: 1 } },
      { key: "C", label: "愿意讲逻辑，但尽量不伤人", score: { D: 2 } },
      { key: "D", label: "嘴可能损，但论据一般比感情多", score: { D: 3 } },
    ],
  },
  {
    id: "Q39",
    type: "main",
    dimension: "G",
    category: "formal",
    title: "你看到一套风格很怪、但成品参考图很少的贴纸，会？",
    options: [
      { key: "A", label: "参考图少，先不买", score: {} },
      { key: "B", label: "等更多人实贴后再看", score: { G: 1 } },
      { key: "C", label: "正因为没人贴，我更想试", score: { G: 3 } },
      { key: "D", label: "会先想它能不能进我的某个主题", score: { G: 2 } },
    ],
  },
  {
    id: "Q40",
    type: "main",
    dimension: "T",
    category: "random",
    title: "月底你更可能盘点哪件事？",
    options: [
      { key: "A", label: "什么都不盘", score: {} },
      { key: "B", label: "看这月花了多少贴纸钱", score: { T: 1 } },
      { key: "C", label: "看哪些主题想贴还没动", score: { T: 2 } },
      { key: "D", label: "数量、价格、已用、未评，一个都不想放过", score: { T: 3 } },
    ],
  },
] as MainQuestion[];

export const hiddenQuestions: HiddenQuestion[] = [
  {
    id: "H1",
    type: "hidden",
    trigger: "X >= 10 && D >= 10",
    title: "你给一款贴纸写低分带图点评时，最爽的是哪一步？",
    options: [
      { key: "A", label: "先用精致造景证明我真的认真用过", score: { X: 2 } },
      { key: "B", label: "把质量和贴感问题讲到无法反驳", score: { D: 2 } },
      { key: "C", label: "又有图又有刀，甚至还挺漂亮", score: { X: 1, D: 1 } },
      { key: "D", label: "算了，差评也要花力气", score: {} },
    ],
  },
  {
    id: "H2",
    type: "hidden",
    trigger: "G >= 10 && T >= 10",
    title: "一款冷门商家的怪味系列突然下架，你更不能接受哪件事？",
    options: [
      { key: "A", label: "这么怪得刚刚好的风格没了", score: { G: 2 } },
      { key: "B", label: "我的系列收纳永远差最后一款", score: { T: 2 } },
      { key: "C", label: "两种都不能接受，我会记到下次补货梦里", score: { G: 1, T: 1 } },
      { key: "D", label: "都还好，贴纸玩家也要学会释怀", score: {} },
    ],
  },
  {
    id: "H3",
    type: "hidden",
    trigger: "Q >= 10 && R >= 10",
    title: "你发布一条高分点评，最想留下什么？",
    options: [
      { key: "A", label: "帮别人判断它到底适不适合入", score: { Q: 2 } },
      { key: "B", label: "记录它在我那页造景里的位置", score: { R: 2 } },
      { key: "C", label: "既能安利别人，又能保存自己的作品记忆", score: { Q: 1, R: 1 } },
      { key: "D", label: "没有那么伟大，贴完顺手写一下", score: {} },
    ],
  },
  {
    id: "H4",
    type: "hidden",
    trigger: "满足任一隐藏人格条件时出现",
    title: "如果把你的收纳仓拍成纪录片，片名最像哪一个？",
    options: [
      { key: "A", label: "《我不是毒舌，我只是认真用过》", score: {} },
      { key: "B", label: "《未贴库存今晚必须清点》", score: {} },
      { key: "C", label: "《一张贴纸住进我的小世界》", score: {} },
      { key: "D", label: "《我真的只是随便贴贴》", score: {} },
    ],
  },
] as HiddenQuestion[];

export const hiddenPersonaRules: HiddenPersonaRule[] = [
  {
    id: "hidden-judgement",
    name: "带图避雷审判官",
    condition: "D >= 12 && Q <= 5",
    description: "你不是刻薄，你只是把每个雷点都拍得清清楚楚。",
  },
  {
    id: "hidden-hamster",
    name: "收纳仓仓管神",
    condition: "T >= 13 && G <= 6",
    description: "你收贴纸像管库存，拥有、已贴、未评都得对齐。",
  },
  {
    id: "hidden-midnight",
    name: "造景剧场主演",
    condition: "X >= 12 && R >= 12",
    description: "你贴的不是素材，是一小段带情绪的布景。",
  },
] as HiddenPersonaRule[];

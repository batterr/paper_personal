export type Persona = {
  index: number;
  code: string;
  slug: string;
  name: string;
  chinlish: string;
  oneLiner: string;
  traits: string[];
  stereotype: string;
  scene: string;
  posterTitle: string;
};

export type HiddenPersonaProfile = {
  slug: string;
  name: string;
  chinlish?: string;
  oneLiner: string;
  posterTitle: string;
};

export const personas: Persona[] = [
  {
    index: 1,
    code: "1111",
    slug: "ceping-juanwang",
    name: "测评界卷王",
    chinlish: "Test-Juan-King",
    oneLiner: "你冲得最快、贴得最细、写得最长、收纳得最妥帖——贴纸圈的内卷之王，建议给你发个“感动中国贴纸奖”。",
    traits: ["冲评先锋", "无脑爽派", "话痨输出", "珍藏供起"],
    stereotype: "你像贴纸圈自动运转的测评机器：上新要冲、过程要拍、雷点要写、成品还要归档。",
    scene: "新品到手当天完成实贴、长评、标签和收纳册归位。",
    posterTitle: "你是测评界卷王",
  },
  {
    index: 2,
    code: "1110",
    slug: "shuangtie-kuaizuixia",
    name: "爽贴快嘴侠",
    chinlish: "So-Tie-Quick-Mouth",
    oneLiner: "买新、爽贴、锐评、扔——你的贴纸人生四部曲，比快餐还快。收纳册？那是什么，能吃吗？",
    traits: ["冲评先锋", "无脑爽派", "话痨输出", "用完即弃"],
    stereotype: "你的点评来得很快，成品走得也很快，快乐主打一个不留库存包袱。",
    scene: "边贴边吐槽，贴完发完就换下一张。",
    posterTitle: "你是爽贴快嘴侠",
  },
  {
    index: 3,
    code: "1101",
    slug: "gudu-huanyuanjiang",
    name: "孤独还原匠",
    chinlish: "Good-Do-Restore",
    oneLiner: "快快买，爽爽贴，收进册子从不发图。别人以为你退坑了，其实你只是懒得晒——社恐型贴纸独享主义。",
    traits: ["冲评先锋", "无脑爽派", "潜水观察", "珍藏供起"],
    stereotype: "你不是不爱贴纸，你只是把快乐锁在自己的收纳册里。",
    scene: "照着示意图贴到极致还原，再静悄悄收好。",
    posterTitle: "你是孤独还原匠",
  },
  {
    index: 4,
    code: "1100",
    slug: "yicixing-kuaigan",
    name: "一次性快感者",
    chinlish: "One-Time-Happy",
    oneLiner: "买的时候最兴奋，贴完瞬间失忆。你的贴纸人生信条：爽过等于拥有过。",
    traits: ["冲评先锋", "无脑爽派", "潜水观察", "用完即弃"],
    stereotype: "你享受的是下单和排废的冲击波，后续归档不在你的精神服务区。",
    scene: "快速开贴、快速快乐、快速进入下一套诱惑。",
    posterTitle: "你是一次性快感者",
  },
  {
    index: 5,
    code: "1011",
    slug: "xijie-kaoguxuejia",
    name: "细节考古学家",
    chinlish: "Detail-Kao-Goal",
    oneLiner: "专挑拆得细的款，边贴边研究逻辑，最后还要写论文级避雷指南。建议你去考个贴纸学博士。",
    traits: ["冲评先锋", "放着我来", "话痨输出", "珍藏供起"],
    stereotype: "别人贴完看成品，你贴完能复盘出商家的结构逻辑和偷懒证据。",
    scene: "高难度造景拆解、过程拍照、细节标注、成品收藏。",
    posterTitle: "你是细节考古学家",
  },
  {
    index: 6,
    code: "1010",
    slug: "leziren-pohuaizhe",
    name: "乐子人破坏者",
    chinlish: "Fun-Po-Huai",
    oneLiner: "买新、乱贴、写梗评、然后扔掉。你是贴纸圈的破坏神，但大家都爱看你的吐槽。",
    traits: ["冲评先锋", "放着我来", "话痨输出", "用完即弃"],
    stereotype: "你把翻车改造成段子，把雷点炼成评论区快乐源泉。",
    scene: "故意挑战难贴款，贴完用梗评给大家醒脑。",
    posterTitle: "你是乐子人破坏者",
  },
  {
    index: 7,
    code: "1001",
    slug: "cangpin-gaizaoren",
    name: "藏品改造人",
    chinlish: "Hide-Pin-Change",
    oneLiner: "冲最爱的款，买来默默改造，成品只给自己看。你的收纳册如藏宝阁，“我在故宫修文物”。",
    traits: ["冲评先锋", "放着我来", "潜水观察", "珍藏供起"],
    stereotype: "你对外很安静，对内把每张贴纸都改造成自己的私人版本。",
    scene: "深夜慢贴、自由改造、成品只进私密收纳册。",
    posterTitle: "你是藏品改造人",
  },
  {
    index: 8,
    code: "1000",
    slug: "suixing-langzi",
    name: "随性浪子",
    chinlish: "Sway-Sing-Run",
    oneLiner: "买就买了，贴就贴了，怎样都好。你的人生如贴纸，撕下来就不回头。",
    traits: ["冲评先锋", "放着我来", "潜水观察", "用完即弃"],
    stereotype: "你不纠结、不复盘、不留恋，贴纸只是当下的一阵风。",
    scene: "看到喜欢就买，贴成什么样都算今天的缘分。",
    posterTitle: "你是随性浪子",
  },
  {
    index: 9,
    code: "0111",
    slug: "koubei-banyungong",
    name: "口碑搬运工",
    chinlish: "Mouth-Bei-Move",
    oneLiner: "等别人踩完雷才买，贴完必发小作文，还要裱起来。你是大家的良心，但也是拖延症晚期。",
    traits: ["谨慎记录", "无脑爽派", "话痨输出", "珍藏供起"],
    stereotype: "你不当第一批勇士，但会把成熟经验整理得很像公共服务。",
    scene: "看完一圈测评再下手，贴完给后来者留详细口碑。",
    posterTitle: "你是口碑搬运工",
  },
  {
    index: 10,
    code: "0110",
    slug: "xingjiabi-pinglunjia",
    name: "性价比评论家",
    chinlish: "Price-Can-Be",
    oneLiner: "必须值回票价才会夸，贴完转身就扔。你的点评冷血又精准，适合去当质检员。",
    traits: ["谨慎记录", "无脑爽派", "话痨输出", "用完即弃"],
    stereotype: "你对价格、贴感和完成效果的判断像收据一样冷静。",
    scene: "券后入手，贴完立刻给出值不值的结论。",
    posterTitle: "你是性价比评论家",
  },
  {
    index: 11,
    code: "0101",
    slug: "yinxing-shoujizhe",
    name: "隐形收集者",
    chinlish: "In-Scene-Collector",
    oneLiner: "只买高分款，贴得工整，藏得私密。你的库存是都市传说，没人见过真容。",
    traits: ["谨慎记录", "无脑爽派", "潜水观察", "珍藏供起"],
    stereotype: "你像一个低调的精品仓库，外面风平浪静，里面井井有条。",
    scene: "慢慢筛选高口碑款，工整贴完后静静归档。",
    posterTitle: "你是隐形收集者",
  },
  {
    index: 12,
    code: "0100",
    slug: "foxi-xiaoqianjia",
    name: "佛系消遣家",
    chinlish: "Fo-See-Chill",
    oneLiner: "看测评避开雷款，到手无脑贴，贴完扔抽屉。你是贴纸圈扫地僧，不争不抢。",
    traits: ["谨慎记录", "无脑爽派", "潜水观察", "用完即弃"],
    stereotype: "你只想轻松玩一会儿，不想被贴纸圈的胜负欲拖进战场。",
    scene: "有空就贴一张，没空就让它继续在抽屉里睡觉。",
    posterTitle: "你是佛系消遣家",
  },
  {
    index: 13,
    code: "0011",
    slug: "jiegouzhuyi-dashi",
    name: "解构主义大师",
    chinlish: "Jie-Go-Master",
    oneLiner: "专挑别人说不好贴的款，改造成艺术品并写论文。你是疯子，也是天才，建议出书。",
    traits: ["谨慎记录", "放着我来", "话痨输出", "珍藏供起"],
    stereotype: "你对难贴款有一种不健康的兴奋，并且能把翻车讲成方法论。",
    scene: "挑战冷门难款，改造出新版本，再写出完整复盘。",
    posterTitle: "你是解构主义大师",
  },
  {
    index: 14,
    code: "0010",
    slug: "tucaoyi-pingceyuan",
    name: "吐槽役评测员",
    chinlish: "Too-Chao-Reviewer",
    oneLiner: "哪里打折买哪里，贴的时候乱来，写点评全是梗。你是快乐源泉，你的评论区比贴纸好看。",
    traits: ["谨慎记录", "放着我来", "话痨输出", "用完即弃"],
    stereotype: "你不一定贴得最稳，但一定能把体验讲得最好笑。",
    scene: "打折入手、随手改造、评论区开始接梗。",
    posterTitle: "你是吐槽役评测员",
  },
  {
    index: 15,
    code: "0001",
    slug: "gudu-shiyanjia",
    name: "孤独试验家",
    chinlish: "Good-Do-Experiment",
    oneLiner: "冷门打折款买来默默研究，成品自己欣赏。你是暗黑科学家，贴纸是你的人体实验对象。",
    traits: ["谨慎记录", "放着我来", "潜水观察", "珍藏供起"],
    stereotype: "你像在自己的桌面实验室里研究贴纸生态，成果不轻易公开。",
    scene: "低价冷门款、小心试验、成功后放进私人收藏。",
    posterTitle: "你是孤独试验家",
  },
  {
    index: 16,
    code: "0000",
    slug: "suixing-tiyanshi",
    name: "随性体验师",
    chinlish: "Sway-Sing-Try",
    oneLiner: "一切随缘，贴完即空。你的境界：手中无贴，心中也无贴——简称“贴纸贤者”。",
    traits: ["谨慎记录", "放着我来", "潜水观察", "用完即弃"],
    stereotype: "你已经把贴纸玩成一种路过：来时不强求，走时不回头。",
    scene: "随便买、随便贴、随便放下，主打精神轻盈。",
    posterTitle: "你是随性体验师",
  },
] satisfies Persona[];

export const hiddenPersonaProfiles: HiddenPersonaProfile[] = [];

export function getPersonaImageSrc(persona: { slug: string }) {
  return `/personas/${persona.slug}.svg`;
}

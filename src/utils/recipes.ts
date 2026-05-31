import type { Recipe } from '@/types';

// 南北方菜系定义
const northCuisines = [
  '鲁菜', '京菜', '津菜', '东北菜', '西北菜', '豫菜', '晋菜', '新疆菜', '内蒙古菜', '冀菜',
];
const southCuisines = [
  '川菜', '粤菜', '苏菜', '浙菜', '湘菜', '闽菜', '徽菜', '赣菜',
  '沪菜', '鄂菜', '客家菜', '滇菜', '黔菜', '桂菜', '琼菜', '藏菜',
  '台湾菜', '港式', '东南亚',
];
// 不分南北：'家常', '通用', '小吃', '日料', '韩料', '西餐', '印度菜', '中东', '烧烤', '方便食品'

// ===== 菜谱库 (500+ 道完整菜品, 一人份营养估算) =====
const recipeDB: Recipe[] = [

  // ===== 主食 (80道) =====
  { id: 's1', name: '白米饭(1碗)', calories: 232, carbs: 52, protein: 5.2, fat: 0.6, category: '主食', cuisine: '通用' },
  { id: 's2', name: '蛋炒饭', calories: 420, carbs: 50, protein: 12, fat: 18, category: '主食', cuisine: '家常' },
  { id: 's3', name: '扬州炒饭', calories: 480, carbs: 55, protein: 15, fat: 22, category: '主食', cuisine: '苏菜' },
  { id: 's4', name: '菠萝炒饭', calories: 440, carbs: 58, protein: 10, fat: 16, category: '主食', cuisine: '东南亚' },
  { id: 's5', name: '兰州拉面', calories: 380, carbs: 60, protein: 12, fat: 10, category: '主食', cuisine: '西北菜' },
  { id: 's6', name: '炸酱面', calories: 450, carbs: 62, protein: 15, fat: 16, category: '主食', cuisine: '京菜' },
  { id: 's7', name: '番茄鸡蛋面', calories: 350, carbs: 48, protein: 14, fat: 10, category: '主食', cuisine: '家常' },
  { id: 's8', name: '牛肉面(红烧)', calories: 420, carbs: 52, protein: 22, fat: 14, category: '主食', cuisine: '西北菜' },
  { id: 's9', name: '刀削面(汤)', calories: 370, carbs: 55, protein: 10, fat: 12, category: '主食', cuisine: '晋菜' },
  { id: 's10', name: '担担面', calories: 340, carbs: 44, protein: 14, fat: 12, category: '主食', cuisine: '川菜' },
  { id: 's11', name: '热干面', calories: 380, carbs: 55, protein: 14, fat: 12, category: '主食', cuisine: '鄂菜' },
  { id: 's12', name: '葱油拌面', calories: 320, carbs: 44, protein: 10, fat: 12, category: '主食', cuisine: '沪菜' },
  { id: 's13', name: '阳春面', calories: 260, carbs: 42, protein: 8, fat: 6, category: '主食', cuisine: '苏菜' },
  { id: 's14', name: '重庆小面', calories: 350, carbs: 44, protein: 12, fat: 14, category: '主食', cuisine: '川菜' },
  { id: 's15', name: '岐山臊子面', calories: 380, carbs: 50, protein: 14, fat: 14, category: '主食', cuisine: '西北菜' },
  { id: 's16', name: '河南烩面', calories: 400, carbs: 55, protein: 16, fat: 14, category: '主食', cuisine: '豫菜' },
  { id: 's17', name: '饺子(12个)', calories: 390, carbs: 44, protein: 18, fat: 16, category: '主食', cuisine: '家常' },
  { id: 's18', name: '馄饨(12个)', calories: 310, carbs: 38, protein: 14, fat: 12, category: '主食', cuisine: '家常' },
  { id: 's19', name: '红油抄手', calories: 360, carbs: 34, protein: 16, fat: 18, category: '主食', cuisine: '川菜' },
  { id: 's20', name: '包子(2个)', calories: 340, carbs: 42, protein: 13, fat: 14, category: '主食', cuisine: '家常' },
  { id: 's21', name: '小笼包(6个)', calories: 320, carbs: 30, protein: 16, fat: 15, category: '主食', cuisine: '苏菜' },
  { id: 's22', name: '生煎包(4个)', calories: 370, carbs: 34, protein: 14, fat: 20, category: '主食', cuisine: '沪菜' },
  { id: 's23', name: '灌汤包(4个)', calories: 300, carbs: 28, protein: 16, fat: 14, category: '主食', cuisine: '豫菜' },
  { id: 's24', name: '肉夹馍', calories: 380, carbs: 40, protein: 16, fat: 18, category: '主食', cuisine: '西北菜' },
  { id: 's25', name: '煎饼果子', calories: 340, carbs: 44, protein: 13, fat: 12, category: '主食', cuisine: '津菜' },
  { id: 's26', name: '馒头(1个)', calories: 223, carbs: 44, protein: 7, fat: 1.1, category: '主食', cuisine: '通用' },
  { id: 's27', name: '花卷(1个)', calories: 211, carbs: 42, protein: 6.4, fat: 1.3, category: '主食', cuisine: '家常' },
  { id: 's28', name: '烧饼', calories: 326, carbs: 52, protein: 8, fat: 10, category: '主食', cuisine: '家常' },
  { id: 's29', name: '葱油饼', calories: 310, carbs: 42, protein: 8, fat: 12, category: '主食', cuisine: '家常' },
  { id: 's30', name: '手抓饼', calories: 340, carbs: 38, protein: 7, fat: 18, category: '主食', cuisine: '台湾菜' },
  { id: 's31', name: '千层饼', calories: 285, carbs: 38, protein: 8, fat: 11, category: '主食', cuisine: '家常' },
  { id: 's32', name: '油条(2根)', calories: 320, carbs: 38, protein: 6, fat: 16, category: '主食', cuisine: '通用' },
  { id: 's33', name: '炒河粉', calories: 390, carbs: 50, protein: 10, fat: 16, category: '主食', cuisine: '粤菜' },
  { id: 's34', name: '干炒牛河', calories: 450, carbs: 52, protein: 20, fat: 18, category: '主食', cuisine: '粤菜' },
  { id: 's35', name: '星洲炒米', calories: 410, carbs: 48, protein: 14, fat: 16, category: '主食', cuisine: '东南亚' },
  { id: 's36', name: '螺蛳粉', calories: 380, carbs: 54, protein: 12, fat: 14, category: '主食', cuisine: '桂菜' },
  { id: 's37', name: '桂林米粉', calories: 350, carbs: 52, protein: 10, fat: 10, category: '主食', cuisine: '桂菜' },
  { id: 's38', name: '过桥米线', calories: 360, carbs: 48, protein: 14, fat: 12, category: '主食', cuisine: '滇菜' },
  { id: 's39', name: '酸辣粉', calories: 320, carbs: 48, protein: 6, fat: 10, category: '主食', cuisine: '川菜' },
  { id: 's40', name: '南昌炒粉', calories: 350, carbs: 50, protein: 8, fat: 12, category: '主食', cuisine: '赣菜' },
  { id: 's41', name: '肠粉(鲜虾)', calories: 280, carbs: 38, protein: 10, fat: 8, category: '主食', cuisine: '粤菜' },
  { id: 's42', name: '煲仔饭', calories: 440, carbs: 55, protein: 18, fat: 16, category: '主食', cuisine: '粤菜' },
  { id: 's43', name: '黄焖鸡米饭', calories: 420, carbs: 48, protein: 24, fat: 14, category: '主食', cuisine: '鲁菜' },
  { id: 's44', name: '咖喱饭', calories: 460, carbs: 58, protein: 16, fat: 18, category: '主食', cuisine: '印度菜' },
  { id: 's45', name: '照烧鸡腿饭', calories: 480, carbs: 52, protein: 28, fat: 16, category: '主食', cuisine: '日料' },
  { id: 's46', name: '鳗鱼饭', calories: 520, carbs: 54, protein: 22, fat: 22, category: '主食', cuisine: '日料' },
  { id: 's47', name: '日式拉面', calories: 420, carbs: 52, protein: 16, fat: 16, category: '主食', cuisine: '日料' },
  { id: 's48', name: '乌冬面', calories: 320, carbs: 50, protein: 10, fat: 6, category: '主食', cuisine: '日料' },
  { id: 's49', name: '荞麦面(冷)', calories: 280, carbs: 48, protein: 12, fat: 3, category: '主食', cuisine: '日料' },
  { id: 's50', name: '石锅拌饭', calories: 440, carbs: 60, protein: 16, fat: 14, category: '主食', cuisine: '韩料' },
  { id: 's51', name: '韩式拌饭', calories: 410, carbs: 55, protein: 14, fat: 14, category: '主食', cuisine: '韩料' },
  { id: 's52', name: '韩式冷面', calories: 300, carbs: 52, protein: 8, fat: 5, category: '主食', cuisine: '韩料' },
  { id: 's53', name: '韩式炸酱面', calories: 400, carbs: 55, protein: 12, fat: 14, category: '主食', cuisine: '韩料' },
  { id: 's54', name: '意大利肉酱面', calories: 460, carbs: 58, protein: 18, fat: 16, category: '主食', cuisine: '西餐' },
  { id: 's55', name: '奶油培根意面', calories: 520, carbs: 55, protein: 16, fat: 26, category: '主食', cuisine: '西餐' },
  { id: 's56', name: '青酱意面', calories: 440, carbs: 50, protein: 12, fat: 22, category: '主食', cuisine: '西餐' },
  { id: 's57', name: '西班牙海鲜饭', calories: 520, carbs: 55, protein: 28, fat: 18, category: '主食', cuisine: '西餐' },
  { id: 's58', name: '印尼炒饭', calories: 450, carbs: 54, protein: 14, fat: 18, category: '主食', cuisine: '东南亚' },
  { id: 's59', name: '海南鸡饭', calories: 430, carbs: 44, protein: 24, fat: 16, category: '主食', cuisine: '琼菜' },
  { id: 's60', name: '羊肉泡馍', calories: 460, carbs: 52, protein: 20, fat: 18, category: '主食', cuisine: '西北菜' },
  { id: 's61', name: '馕', calories: 350, carbs: 55, protein: 10, fat: 8, category: '主食', cuisine: '新疆菜' },
  { id: 's62', name: '烤包子(2个)', calories: 360, carbs: 38, protein: 14, fat: 16, category: '主食', cuisine: '新疆菜' },
  { id: 's63', name: '糯米鸡', calories: 380, carbs: 44, protein: 14, fat: 16, category: '主食', cuisine: '粤菜' },
  { id: 's64', name: '粽子(肉粽)', calories: 340, carbs: 44, protein: 10, fat: 12, category: '主食', cuisine: '家常' },
  { id: 's65', name: '紫菜包饭(10个)', calories: 320, carbs: 44, protein: 10, fat: 10, category: '主食', cuisine: '韩料' },
  { id: 's66', name: '寿司(8个)', calories: 350, carbs: 50, protein: 14, fat: 8, category: '主食', cuisine: '日料' },
  { id: 's67', name: '饭团(2个)', calories: 300, carbs: 44, protein: 8, fat: 8, category: '主食', cuisine: '日料' },
  { id: 's68', name: '豆沙包(2个)', calories: 310, carbs: 52, protein: 8, fat: 6, category: '主食', cuisine: '家常' },
  { id: 's69', name: '奶黄包(2个)', calories: 330, carbs: 48, protein: 8, fat: 10, category: '主食', cuisine: '粤菜' },
  { id: 's70', name: '叉烧包(2个)', calories: 340, carbs: 44, protein: 12, fat: 12, category: '主食', cuisine: '粤菜' },
  { id: 's71', name: '肉松面包', calories: 350, carbs: 42, protein: 12, fat: 14, category: '主食', cuisine: '台湾菜' },
  { id: 's72', name: '三明治(火腿)', calories: 350, carbs: 36, protein: 14, fat: 16, category: '主食', cuisine: '西餐' },
  { id: 's73', name: '汉堡(牛肉)', calories: 480, carbs: 40, protein: 24, fat: 24, category: '主食', cuisine: '西餐' },
  { id: 's74', name: '热狗', calories: 380, carbs: 34, protein: 12, fat: 22, category: '主食', cuisine: '西餐' },
  { id: 's75', name: '披萨(2片)', calories: 480, carbs: 52, protein: 18, fat: 22, category: '主食', cuisine: '西餐' },
  { id: 's76', name: '葱油拌川', calories: 340, carbs: 46, protein: 10, fat: 12, category: '主食', cuisine: '浙菜' },
  { id: 's77', name: '片儿川', calories: 350, carbs: 48, protein: 12, fat: 10, category: '主食', cuisine: '浙菜' },
  { id: 's78', name: '羊肉烩面', calories: 420, carbs: 52, protein: 20, fat: 16, category: '主食', cuisine: '豫菜' },
  { id: 's79', name: '油泼面', calories: 380, carbs: 48, protein: 10, fat: 16, category: '主食', cuisine: '西北菜' },
  { id: 's80', name: 'biangbiang面', calories: 400, carbs: 52, protein: 12, fat: 16, category: '主食', cuisine: '西北菜' },

  // ===== 荤菜 (180道) =====
  // 川菜荤菜
  { id: 'm1', name: '宫保鸡丁', calories: 290, carbs: 8, protein: 22, fat: 18, category: '荤菜', cuisine: '川菜' },
  { id: 'm2', name: '鱼香肉丝', calories: 280, carbs: 10, protein: 16, fat: 18, category: '荤菜', cuisine: '川菜' },
  { id: 'm3', name: '回锅肉', calories: 330, carbs: 6, protein: 16, fat: 26, category: '荤菜', cuisine: '川菜' },
  { id: 'm4', name: '水煮肉片', calories: 280, carbs: 5, protein: 22, fat: 18, category: '荤菜', cuisine: '川菜' },
  { id: 'm5', name: '水煮牛肉', calories: 290, carbs: 5, protein: 24, fat: 20, category: '荤菜', cuisine: '川菜' },
  { id: 'm6', name: '辣子鸡', calories: 320, carbs: 8, protein: 24, fat: 22, category: '荤菜', cuisine: '川菜' },
  { id: 'm7', name: '麻婆豆腐', calories: 200, carbs: 6, protein: 12, fat: 14, category: '荤菜', cuisine: '川菜' },
  { id: 'm8', name: '酸菜鱼', calories: 240, carbs: 6, protein: 24, fat: 12, category: '荤菜', cuisine: '川菜' },
  { id: 'm9', name: '水煮鱼', calories: 260, carbs: 4, protein: 22, fat: 16, category: '荤菜', cuisine: '川菜' },
  { id: 'm10', name: '毛血旺', calories: 350, carbs: 8, protein: 24, fat: 24, category: '荤菜', cuisine: '川菜' },
  { id: 'm11', name: '蒜泥白肉', calories: 280, carbs: 4, protein: 16, fat: 23, category: '荤菜', cuisine: '川菜' },
  { id: 'm12', name: '夫妻肺片', calories: 220, carbs: 4, protein: 20, fat: 14, category: '荤菜', cuisine: '川菜' },
  { id: 'm13', name: '口水鸡', calories: 240, carbs: 4, protein: 22, fat: 16, category: '荤菜', cuisine: '川菜' },
  { id: 'm14', name: '干煸牛肉丝', calories: 280, carbs: 5, protein: 26, fat: 18, category: '荤菜', cuisine: '川菜' },
  { id: 'm15', name: '泡椒牛蛙', calories: 200, carbs: 4, protein: 22, fat: 10, category: '荤菜', cuisine: '川菜' },
  { id: 'm16', name: '啤酒鸭', calories: 310, carbs: 6, protein: 24, fat: 20, category: '荤菜', cuisine: '川菜' },
  { id: 'm17', name: '歌乐山辣子鸡', calories: 350, carbs: 10, protein: 26, fat: 24, category: '荤菜', cuisine: '川菜' },

  // 粤菜荤菜
  { id: 'm18', name: '白切鸡', calories: 250, carbs: 1, protein: 28, fat: 14, category: '荤菜', cuisine: '粤菜' },
  { id: 'm19', name: '叉烧肉', calories: 340, carbs: 18, protein: 22, fat: 20, category: '荤菜', cuisine: '粤菜' },
  { id: 'm20', name: '烧鹅', calories: 380, carbs: 8, protein: 24, fat: 28, category: '荤菜', cuisine: '粤菜' },
  { id: 'm21', name: '蜜汁叉烧', calories: 350, carbs: 20, protein: 24, fat: 22, category: '荤菜', cuisine: '粤菜' },
  { id: 'm22', name: '清蒸鲈鱼', calories: 210, carbs: 1, protein: 28, fat: 10, category: '荤菜', cuisine: '粤菜' },
  { id: 'm23', name: '白灼虾', calories: 180, carbs: 1, protein: 26, fat: 6, category: '荤菜', cuisine: '粤菜' },
  { id: 'm24', name: '椒盐虾', calories: 220, carbs: 8, protein: 24, fat: 10, category: '荤菜', cuisine: '粤菜' },
  { id: 'm25', name: '蒜蓉粉丝蒸虾', calories: 230, carbs: 12, protein: 22, fat: 8, category: '荤菜', cuisine: '粤菜' },
  { id: 'm26', name: '豉汁蒸排骨', calories: 290, carbs: 6, protein: 18, fat: 20, category: '荤菜', cuisine: '粤菜' },
  { id: 'm27', name: '凤爪(豉汁蒸)', calories: 200, carbs: 5, protein: 14, fat: 14, category: '荤菜', cuisine: '粤菜' },
  { id: 'm28', name: '姜葱炒蟹', calories: 250, carbs: 6, protein: 22, fat: 14, category: '荤菜', cuisine: '粤菜' },
  { id: 'm29', name: '避风塘炒蟹', calories: 320, carbs: 10, protein: 22, fat: 22, category: '荤菜', cuisine: '粤菜' },
  { id: 'm30', name: '豆豉鲮鱼油麦菜', calories: 220, carbs: 5, protein: 18, fat: 14, category: '荤菜', cuisine: '粤菜' },
  { id: 'm31', name: '盐焗鸡', calories: 280, carbs: 2, protein: 28, fat: 18, category: '荤菜', cuisine: '客家菜' },
  { id: 'm32', name: '梅菜扣肉', calories: 380, carbs: 10, protein: 12, fat: 32, category: '荤菜', cuisine: '客家菜' },
  { id: 'm33', name: '客家酿豆腐', calories: 220, carbs: 8, protein: 16, fat: 12, category: '荤菜', cuisine: '客家菜' },
  { id: 'm34', name: '蚝油牛肉', calories: 260, carbs: 8, protein: 24, fat: 14, category: '荤菜', cuisine: '粤菜' },
  { id: 'm35', name: '菠萝咕咾肉', calories: 320, carbs: 20, protein: 14, fat: 18, category: '荤菜', cuisine: '粤菜' },

  // 湘菜荤菜
  { id: 'm36', name: '剁椒鱼头', calories: 230, carbs: 6, protein: 22, fat: 12, category: '荤菜', cuisine: '湘菜' },
  { id: 'm37', name: '小炒肉', calories: 290, carbs: 4, protein: 18, fat: 22, category: '荤菜', cuisine: '湘菜' },
  { id: 'm38', name: '东安子鸡', calories: 240, carbs: 4, protein: 26, fat: 14, category: '荤菜', cuisine: '湘菜' },
  { id: 'm39', name: '腊肉炒蒜苗', calories: 280, carbs: 8, protein: 14, fat: 20, category: '荤菜', cuisine: '湘菜' },
  { id: 'm40', name: '辣椒炒肉', calories: 260, carbs: 5, protein: 18, fat: 18, category: '荤菜', cuisine: '湘菜' },
  { id: 'm41', name: '酸豆角炒肉末', calories: 220, carbs: 10, protein: 14, fat: 14, category: '荤菜', cuisine: '湘菜' },

  // 鲁菜荤菜
  { id: 'm42', name: '糖醋里脊', calories: 320, carbs: 22, protein: 16, fat: 16, category: '荤菜', cuisine: '鲁菜' },
  { id: 'm43', name: '葱烧海参', calories: 180, carbs: 8, protein: 16, fat: 8, category: '荤菜', cuisine: '鲁菜' },
  { id: 'm44', name: '九转大肠', calories: 350, carbs: 10, protein: 14, fat: 28, category: '荤菜', cuisine: '鲁菜' },
  { id: 'm45', name: '黄焖鸡', calories: 290, carbs: 10, protein: 22, fat: 16, category: '荤菜', cuisine: '鲁菜' },
  { id: 'm46', name: '济南把子肉', calories: 380, carbs: 5, protein: 16, fat: 34, category: '荤菜', cuisine: '鲁菜' },
  { id: 'm47', name: '爆炒腰花', calories: 220, carbs: 6, protein: 20, fat: 12, category: '荤菜', cuisine: '鲁菜' },
  { id: 'm48', name: '油焖大虾', calories: 240, carbs: 8, protein: 22, fat: 12, category: '荤菜', cuisine: '鲁菜' },
  { id: 'm49', name: '干炸里脊', calories: 320, carbs: 18, protein: 20, fat: 18, category: '荤菜', cuisine: '鲁菜' },

  // 京菜荤菜
  { id: 'm50', name: '京酱肉丝', calories: 280, carbs: 10, protein: 20, fat: 16, category: '荤菜', cuisine: '京菜' },
  { id: 'm51', name: '北京烤鸭(半只)', calories: 420, carbs: 8, protein: 28, fat: 32, category: '荤菜', cuisine: '京菜' },
  { id: 'm52', name: '涮羊肉(200g)', calories: 350, carbs: 3, protein: 28, fat: 24, category: '荤菜', cuisine: '京菜' },
  { id: 'm53', name: '酱爆鸡丁', calories: 260, carbs: 8, protein: 24, fat: 14, category: '荤菜', cuisine: '京菜' },
  { id: 'm54', name: '芥末墩', calories: 80, carbs: 8, protein: 3, fat: 3, category: '荤菜', cuisine: '京菜' },

  // 苏菜荤菜
  { id: 'm55', name: '东坡肉', calories: 380, carbs: 6, protein: 14, fat: 34, category: '荤菜', cuisine: '苏菜' },
  { id: 'm56', name: '松鼠桂鱼', calories: 320, carbs: 20, protein: 22, fat: 16, category: '荤菜', cuisine: '苏菜' },
  { id: 'm57', name: '水晶肴肉', calories: 260, carbs: 3, protein: 20, fat: 18, category: '荤菜', cuisine: '苏菜' },
  { id: 'm58', name: '盐水鸭', calories: 240, carbs: 2, protein: 26, fat: 14, category: '荤菜', cuisine: '苏菜' },
  { id: 'm59', name: '无锡排骨', calories: 340, carbs: 14, protein: 20, fat: 22, category: '荤菜', cuisine: '苏菜' },
  { id: 'm60', name: '清炖蟹粉狮子头', calories: 320, carbs: 6, protein: 18, fat: 24, category: '荤菜', cuisine: '苏菜' },

  // 浙菜荤菜
  { id: 'm61', name: '东坡肉(浙式)', calories: 360, carbs: 5, protein: 14, fat: 32, category: '荤菜', cuisine: '浙菜' },
  { id: 'm62', name: '西湖醋鱼', calories: 180, carbs: 4, protein: 22, fat: 8, category: '荤菜', cuisine: '浙菜' },
  { id: 'm63', name: '龙井虾仁', calories: 220, carbs: 4, protein: 24, fat: 10, category: '荤菜', cuisine: '浙菜' },
  { id: 'm64', name: '叫花鸡', calories: 320, carbs: 4, protein: 30, fat: 20, category: '荤菜', cuisine: '浙菜' },
  { id: 'm65', name: '干炸响铃', calories: 280, carbs: 14, protein: 16, fat: 18, category: '荤菜', cuisine: '浙菜' },
  { id: 'm66', name: '东坡肘子', calories: 420, carbs: 4, protein: 18, fat: 38, category: '荤菜', cuisine: '浙菜' },

  // 闽菜荤菜
  { id: 'm67', name: '佛跳墙', calories: 350, carbs: 8, protein: 32, fat: 20, category: '荤菜', cuisine: '闽菜' },
  { id: 'm68', name: '荔枝肉', calories: 280, carbs: 18, protein: 16, fat: 14, category: '荤菜', cuisine: '闽菜' },
  { id: 'm69', name: '海蛎煎', calories: 280, carbs: 22, protein: 14, fat: 14, category: '荤菜', cuisine: '闽菜' },
  { id: 'm70', name: '醉排骨', calories: 300, carbs: 10, protein: 18, fat: 20, category: '荤菜', cuisine: '闽菜' },
  { id: 'm71', name: '红糟鸡', calories: 260, carbs: 6, protein: 24, fat: 14, category: '荤菜', cuisine: '闽菜' },

  // 徽菜荤菜
  { id: 'm72', name: '臭鳜鱼', calories: 200, carbs: 2, protein: 26, fat: 10, category: '荤菜', cuisine: '徽菜' },
  { id: 'm73', name: '徽州毛豆腐', calories: 180, carbs: 8, protein: 14, fat: 10, category: '荤菜', cuisine: '徽菜' },
  { id: 'm74', name: '红烧划水', calories: 220, carbs: 6, protein: 18, fat: 12, category: '荤菜', cuisine: '徽菜' },
  { id: 'm75', name: '火腿炖甲鱼', calories: 280, carbs: 4, protein: 28, fat: 16, category: '荤菜', cuisine: '徽菜' },
  { id: 'm76', name: '李鸿章杂烩', calories: 320, carbs: 8, protein: 24, fat: 20, category: '荤菜', cuisine: '徽菜' },

  // 沪菜荤菜
  { id: 'm77', name: '红烧肉(本帮)', calories: 360, carbs: 12, protein: 14, fat: 28, category: '荤菜', cuisine: '沪菜' },
  { id: 'm78', name: '糖醋排骨(本帮)', calories: 320, carbs: 18, protein: 18, fat: 18, category: '荤菜', cuisine: '沪菜' },
  { id: 'm79', name: '油爆虾', calories: 200, carbs: 4, protein: 24, fat: 8, category: '荤菜', cuisine: '沪菜' },
  { id: 'm80', name: '糟溜鱼片', calories: 190, carbs: 6, protein: 20, fat: 8, category: '荤菜', cuisine: '沪菜' },
  { id: 'm81', name: '八宝辣酱', calories: 240, carbs: 12, protein: 14, fat: 14, category: '荤菜', cuisine: '沪菜' },
  { id: 'm82', name: '腌笃鲜', calories: 260, carbs: 6, protein: 20, fat: 16, category: '荤菜', cuisine: '沪菜' },

  // 鄂菜荤菜
  { id: 'm83', name: '清蒸武昌鱼', calories: 200, carbs: 2, protein: 24, fat: 10, category: '荤菜', cuisine: '鄂菜' },
  { id: 'm84', name: '排骨藕汤', calories: 220, carbs: 12, protein: 18, fat: 10, category: '荤菜', cuisine: '鄂菜' },
  { id: 'm85', name: '粉蒸肉', calories: 380, carbs: 14, protein: 16, fat: 28, category: '荤菜', cuisine: '鄂菜' },
  { id: 'm86', name: '沔阳三蒸', calories: 350, carbs: 18, protein: 22, fat: 20, category: '荤菜', cuisine: '鄂菜' },

  // 东北菜荤菜
  { id: 'm87', name: '锅包肉', calories: 340, carbs: 20, protein: 16, fat: 20, category: '荤菜', cuisine: '东北菜' },
  { id: 'm88', name: '小鸡炖蘑菇', calories: 280, carbs: 8, protein: 28, fat: 14, category: '荤菜', cuisine: '东北菜' },
  { id: 'm89', name: '猪肉炖粉条', calories: 350, carbs: 22, protein: 16, fat: 20, category: '荤菜', cuisine: '东北菜' },
  { id: 'm90', name: '酱骨架', calories: 300, carbs: 6, protein: 22, fat: 20, category: '荤菜', cuisine: '东北菜' },
  { id: 'm91', name: '溜肉段', calories: 320, carbs: 16, protein: 18, fat: 20, category: '荤菜', cuisine: '东北菜' },
  { id: 'm92', name: '得莫利炖鱼', calories: 260, carbs: 8, protein: 24, fat: 14, category: '荤菜', cuisine: '东北菜' },
  { id: 'm93', name: '杀猪菜', calories: 380, carbs: 10, protein: 22, fat: 28, category: '荤菜', cuisine: '东北菜' },
  { id: 'm94', name: '溜肥肠', calories: 340, carbs: 8, protein: 14, fat: 28, category: '荤菜', cuisine: '东北菜' },
  { id: 'm95', name: '地三鲜', calories: 180, carbs: 18, protein: 4, fat: 10, category: '荤菜', cuisine: '东北菜' },

  // 西北菜荤菜
  { id: 'm96', name: '大盘鸡', calories: 320, carbs: 16, protein: 24, fat: 16, category: '荤菜', cuisine: '西北菜' },
  { id: 'm97', name: '孜然牛肉', calories: 280, carbs: 4, protein: 26, fat: 18, category: '荤菜', cuisine: '西北菜' },
  { id: 'm98', name: '手抓羊肉', calories: 350, carbs: 2, protein: 26, fat: 26, category: '荤菜', cuisine: '西北菜' },
  { id: 'm99', name: '烤羊排', calories: 420, carbs: 2, protein: 24, fat: 36, category: '荤菜', cuisine: '西北菜' },
  { id: 'm100', name: '烤羊腿', calories: 400, carbs: 3, protein: 30, fat: 30, category: '荤菜', cuisine: '西北菜' },
  { id: 'm101', name: '红烧黄河鲤鱼', calories: 240, carbs: 5, protein: 22, fat: 14, category: '荤菜', cuisine: '豫菜' },
  { id: 'm102', name: '粉蒸牛肉', calories: 280, carbs: 12, protein: 24, fat: 14, category: '荤菜', cuisine: '西北菜' },

  // 新疆菜荤菜
  { id: 'm103', name: '大盘鸡(新疆)', calories: 380, carbs: 20, protein: 26, fat: 20, category: '荤菜', cuisine: '新疆菜' },
  { id: 'm104', name: '烤羊肉串(5串)', calories: 320, carbs: 4, protein: 24, fat: 24, category: '荤菜', cuisine: '新疆菜' },
  { id: 'm105', name: '手抓饭', calories: 480, carbs: 55, protein: 18, fat: 22, category: '荤菜', cuisine: '新疆菜' },
  { id: 'm106', name: '馕包肉', calories: 420, carbs: 38, protein: 22, fat: 20, category: '荤菜', cuisine: '新疆菜' },
  { id: 'm107', name: '椒麻鸡', calories: 260, carbs: 4, protein: 28, fat: 14, category: '荤菜', cuisine: '新疆菜' },

  // 滇菜荤菜
  { id: 'm108', name: '汽锅鸡', calories: 220, carbs: 3, protein: 28, fat: 10, category: '荤菜', cuisine: '滇菜' },
  { id: 'm109', name: '过桥米线(荤)', calories: 400, carbs: 44, protein: 20, fat: 16, category: '荤菜', cuisine: '滇菜' },
  { id: 'm110', name: '宜良烤鸭', calories: 380, carbs: 8, protein: 24, fat: 28, category: '荤菜', cuisine: '滇菜' },
  { id: 'm111', name: '大理酸辣鱼', calories: 190, carbs: 5, protein: 20, fat: 10, category: '荤菜', cuisine: '滇菜' },

  // 黔菜荤菜
  { id: 'm112', name: '酸汤鱼', calories: 180, carbs: 4, protein: 22, fat: 8, category: '荤菜', cuisine: '黔菜' },
  { id: 'm113', name: '宫保鸡丁(黔式)', calories: 300, carbs: 10, protein: 24, fat: 18, category: '荤菜', cuisine: '黔菜' },
  { id: 'm114', name: '辣子鸡(贵州)', calories: 340, carbs: 12, protein: 26, fat: 22, category: '荤菜', cuisine: '黔菜' },
  { id: 'm115', name: '花江狗肉', calories: 320, carbs: 4, protein: 28, fat: 22, category: '荤菜', cuisine: '黔菜' },

  // 桂菜荤菜
  { id: 'm116', name: '柠檬鸭', calories: 280, carbs: 6, protein: 24, fat: 18, category: '荤菜', cuisine: '桂菜' },
  { id: 'm117', name: '啤酒鱼', calories: 220, carbs: 5, protein: 22, fat: 12, category: '荤菜', cuisine: '桂菜' },
  { id: 'm118', name: '田螺酿', calories: 200, carbs: 6, protein: 18, fat: 10, category: '荤菜', cuisine: '桂菜' },
  { id: 'm119', name: '白切土鸡', calories: 260, carbs: 2, protein: 28, fat: 16, category: '荤菜', cuisine: '桂菜' },

  // 赣菜荤菜
  { id: 'm120', name: '三杯鸡', calories: 300, carbs: 6, protein: 26, fat: 20, category: '荤菜', cuisine: '赣菜' },
  { id: 'm121', name: '藜蒿炒腊肉', calories: 240, carbs: 6, protein: 14, fat: 18, category: '荤菜', cuisine: '赣菜' },
  { id: 'm122', name: '鄱阳湖胖鱼头', calories: 200, carbs: 4, protein: 22, fat: 10, category: '荤菜', cuisine: '赣菜' },
  { id: 'm123', name: '粉蒸肉(赣式)', calories: 360, carbs: 16, protein: 16, fat: 26, category: '荤菜', cuisine: '赣菜' },

  // 台湾菜荤菜
  { id: 'm124', name: '三杯鸡(台式)', calories: 320, carbs: 8, protein: 26, fat: 20, category: '荤菜', cuisine: '台湾菜' },
  { id: 'm125', name: '红烧牛肉面(台式)', calories: 440, carbs: 48, protein: 24, fat: 18, category: '荤菜', cuisine: '台湾菜' },
  { id: 'm126', name: '蚵仔煎', calories: 260, carbs: 20, protein: 12, fat: 14, category: '荤菜', cuisine: '台湾菜' },
  { id: 'm127', name: '盐酥鸡', calories: 350, carbs: 18, protein: 20, fat: 22, category: '荤菜', cuisine: '台湾菜' },
  { id: 'm128', name: '卤肉饭', calories: 450, carbs: 44, protein: 16, fat: 24, category: '荤菜', cuisine: '台湾菜' },

  // 家常荤菜
  { id: 'm129', name: '红烧肉', calories: 350, carbs: 10, protein: 14, fat: 28, category: '荤菜', cuisine: '家常' },
  { id: 'm130', name: '糖醋排骨', calories: 320, carbs: 18, protein: 18, fat: 18, category: '荤菜', cuisine: '家常' },
  { id: 'm131', name: '红烧排骨', calories: 310, carbs: 8, protein: 20, fat: 22, category: '荤菜', cuisine: '家常' },
  { id: 'm132', name: '红烧带鱼', calories: 240, carbs: 6, protein: 22, fat: 14, category: '荤菜', cuisine: '家常' },
  { id: 'm133', name: '糖醋带鱼', calories: 260, carbs: 14, protein: 20, fat: 12, category: '荤菜', cuisine: '家常' },
  { id: 'm134', name: '可乐鸡翅', calories: 300, carbs: 14, protein: 20, fat: 18, category: '荤菜', cuisine: '家常' },
  { id: 'm135', name: '红烧鸡块', calories: 280, carbs: 6, protein: 26, fat: 16, category: '荤菜', cuisine: '家常' },
  { id: 'm136', name: '土豆炖牛肉', calories: 300, carbs: 18, protein: 22, fat: 14, category: '荤菜', cuisine: '家常' },
  { id: 'm137', name: '萝卜炖牛腩', calories: 280, carbs: 8, protein: 22, fat: 16, category: '荤菜', cuisine: '家常' },
  { id: 'm138', name: '西红柿炖牛腩', calories: 270, carbs: 10, protein: 22, fat: 14, category: '荤菜', cuisine: '家常' },
  { id: 'm139', name: '酱牛肉', calories: 260, carbs: 3, protein: 30, fat: 14, category: '荤菜', cuisine: '家常' },
  { id: 'm140', name: '红烧牛尾', calories: 320, carbs: 6, protein: 22, fat: 24, category: '荤菜', cuisine: '家常' },
  { id: 'm141', name: '西红柿炒鸡蛋', calories: 200, carbs: 8, protein: 12, fat: 12, category: '荤菜', cuisine: '家常' },
  { id: 'm142', name: '韭菜炒鸡蛋', calories: 180, carbs: 6, protein: 12, fat: 12, category: '荤菜', cuisine: '家常' },
  { id: 'm143', name: '青椒肉丝', calories: 230, carbs: 6, protein: 18, fat: 14, category: '荤菜', cuisine: '家常' },
  { id: 'm144', name: '木须肉', calories: 260, carbs: 10, protein: 18, fat: 16, category: '荤菜', cuisine: '家常' },
  { id: 'm145', name: '红烧狮子头', calories: 350, carbs: 8, protein: 18, fat: 26, category: '荤菜', cuisine: '家常' },
  { id: 'm146', name: '肉末茄子', calories: 250, carbs: 14, protein: 10, fat: 16, category: '荤菜', cuisine: '家常' },
  { id: 'm147', name: '蚂蚁上树', calories: 300, carbs: 22, protein: 12, fat: 18, category: '荤菜', cuisine: '家常' },
  { id: 'm148', name: '冬笋炒肉', calories: 220, carbs: 8, protein: 16, fat: 12, category: '荤菜', cuisine: '家常' },
  { id: 'm149', name: '蒜薹炒肉', calories: 230, carbs: 10, protein: 16, fat: 14, category: '荤菜', cuisine: '家常' },
  { id: 'm150', name: '芹菜炒牛肉', calories: 220, carbs: 6, protein: 22, fat: 12, category: '荤菜', cuisine: '家常' },
  { id: 'm151', name: '洋葱炒牛肉', calories: 240, carbs: 8, protein: 22, fat: 12, category: '荤菜', cuisine: '家常' },
  { id: 'm152', name: '葱爆羊肉', calories: 280, carbs: 6, protein: 22, fat: 18, category: '荤菜', cuisine: '家常' },
  { id: 'm153', name: '蒜蓉蒸虾', calories: 180, carbs: 4, protein: 24, fat: 6, category: '荤菜', cuisine: '家常' },
  { id: 'm154', name: '清蒸鱼', calories: 190, carbs: 2, protein: 26, fat: 8, category: '荤菜', cuisine: '家常' },
  { id: 'm155', name: '红烧鱼', calories: 240, carbs: 6, protein: 24, fat: 12, category: '荤菜', cuisine: '家常' },
  { id: 'm156', name: '糖醋鱼', calories: 260, carbs: 16, protein: 22, fat: 10, category: '荤菜', cuisine: '家常' },
  { id: 'm157', name: '香煎带鱼', calories: 220, carbs: 4, protein: 22, fat: 12, category: '荤菜', cuisine: '家常' },
  { id: 'm158', name: '干炸小黄鱼', calories: 280, carbs: 14, protein: 20, fat: 16, category: '荤菜', cuisine: '家常' },
  { id: 'm159', name: '辣炒花蛤', calories: 160, carbs: 6, protein: 18, fat: 6, category: '荤菜', cuisine: '家常' },
  { id: 'm160', name: '葱姜炒蛏子', calories: 150, carbs: 5, protein: 18, fat: 5, category: '荤菜', cuisine: '家常' },
  { id: 'm161', name: '蒜蓉生蚝', calories: 200, carbs: 8, protein: 16, fat: 12, category: '荤菜', cuisine: '家常' },
  { id: 'm162', name: '剁椒蒸鱼', calories: 200, carbs: 5, protein: 24, fat: 8, category: '荤菜', cuisine: '家常' },

  // 日韩荤菜
  { id: 'm163', name: '照烧鸡腿', calories: 320, carbs: 14, protein: 26, fat: 16, category: '荤菜', cuisine: '日料' },
  { id: 'm164', name: '日式炸猪排', calories: 380, carbs: 22, protein: 20, fat: 22, category: '荤菜', cuisine: '日料' },
  { id: 'm165', name: '烤三文鱼', calories: 290, carbs: 0, protein: 28, fat: 20, category: '荤菜', cuisine: '日料' },
  { id: 'm166', name: '刺身拼盘', calories: 180, carbs: 2, protein: 28, fat: 6, category: '荤菜', cuisine: '日料' },
  { id: 'm167', name: '亲子丼', calories: 420, carbs: 44, protein: 24, fat: 16, category: '荤菜', cuisine: '日料' },
  { id: 'm168', name: '天妇罗(虾)', calories: 320, carbs: 24, protein: 16, fat: 18, category: '荤菜', cuisine: '日料' },
  { id: 'm169', name: '韩式烤肉', calories: 380, carbs: 5, protein: 26, fat: 30, category: '荤菜', cuisine: '韩料' },
  { id: 'm170', name: '韩式炸鸡', calories: 420, carbs: 20, protein: 22, fat: 26, category: '荤菜', cuisine: '韩料' },
  { id: 'm171', name: '韩式辣炒猪肉', calories: 320, carbs: 8, protein: 20, fat: 22, category: '荤菜', cuisine: '韩料' },
  { id: 'm172', name: '参鸡汤', calories: 280, carbs: 8, protein: 30, fat: 14, category: '荤菜', cuisine: '韩料' },

  // 西餐荤菜
  { id: 'm173', name: '牛排(150g)', calories: 310, carbs: 1, protein: 30, fat: 22, category: '荤菜', cuisine: '西餐' },
  { id: 'm174', name: '烤羊排(西式)', calories: 380, carbs: 2, protein: 24, fat: 30, category: '荤菜', cuisine: '西餐' },
  { id: 'm175', name: '烤鸡胸', calories: 220, carbs: 2, protein: 36, fat: 6, category: '荤菜', cuisine: '西餐' },
  { id: 'm176', name: '煎三文鱼', calories: 300, carbs: 1, protein: 28, fat: 22, category: '荤菜', cuisine: '西餐' },
  { id: 'm177', name: '法式油封鸭腿', calories: 380, carbs: 4, protein: 24, fat: 30, category: '荤菜', cuisine: '西餐' },
  { id: 'm178', name: '炸鱼薯条', calories: 420, carbs: 38, protein: 16, fat: 24, category: '荤菜', cuisine: '西餐' },
  { id: 'm179', name: '焗龙虾', calories: 260, carbs: 6, protein: 28, fat: 14, category: '荤菜', cuisine: '西餐' },
  { id: 'm180', name: '德式烤猪肘', calories: 480, carbs: 8, protein: 28, fat: 38, category: '荤菜', cuisine: '西餐' },

  // ===== 素菜 (120道) =====
  // 家常素菜
  { id: 'v1', name: '蒜蓉西兰花', calories: 90, carbs: 10, protein: 5, fat: 4, category: '素菜', cuisine: '家常' },
  { id: 'v2', name: '清炒菠菜', calories: 60, carbs: 6, protein: 4, fat: 2, category: '素菜', cuisine: '家常' },
  { id: 'v3', name: '清炒白菜', calories: 45, carbs: 5, protein: 3, fat: 1, category: '素菜', cuisine: '家常' },
  { id: 'v4', name: '醋溜白菜', calories: 80, carbs: 8, protein: 3, fat: 4, category: '素菜', cuisine: '家常' },
  { id: 'v5', name: '蒜蓉空心菜', calories: 55, carbs: 6, protein: 3, fat: 2, category: '素菜', cuisine: '家常' },
  { id: 'v6', name: '炒豆芽', calories: 60, carbs: 6, protein: 4, fat: 2, category: '素菜', cuisine: '家常' },
  { id: 'v7', name: '清炒苦瓜', calories: 50, carbs: 6, protein: 2, fat: 2, category: '素菜', cuisine: '家常' },
  { id: 'v8', name: '清炒丝瓜', calories: 55, carbs: 6, protein: 2, fat: 2, category: '素菜', cuisine: '家常' },
  { id: 'v9', name: '清炒西葫芦', calories: 50, carbs: 5, protein: 2, fat: 2, category: '素菜', cuisine: '家常' },
  { id: 'v10', name: '炒土豆丝', calories: 140, carbs: 22, protein: 3, fat: 4, category: '素菜', cuisine: '家常' },
  { id: 'v11', name: '酸辣土豆丝', calories: 150, carbs: 22, protein: 3, fat: 5, category: '素菜', cuisine: '家常' },
  { id: 'v12', name: '红烧茄子', calories: 150, carbs: 12, protein: 3, fat: 10, category: '素菜', cuisine: '家常' },
  { id: 'v13', name: '鱼香茄子', calories: 180, carbs: 14, protein: 4, fat: 12, category: '素菜', cuisine: '川菜' },
  { id: 'v14', name: '炒胡萝卜', calories: 80, carbs: 12, protein: 2, fat: 3, category: '素菜', cuisine: '家常' },
  { id: 'v15', name: '炒藕片', calories: 110, carbs: 18, protein: 3, fat: 3, category: '素菜', cuisine: '家常' },
  { id: 'v16', name: '清炒荷兰豆', calories: 80, carbs: 10, protein: 4, fat: 3, category: '素菜', cuisine: '家常' },
  { id: 'v17', name: '清炒四季豆', calories: 85, carbs: 10, protein: 4, fat: 3, category: '素菜', cuisine: '家常' },
  { id: 'v18', name: '干煸四季豆', calories: 180, carbs: 12, protein: 5, fat: 12, category: '素菜', cuisine: '川菜' },
  { id: 'v19', name: '炒茼蒿', calories: 55, carbs: 5, protein: 3, fat: 2, category: '素菜', cuisine: '家常' },
  { id: 'v20', name: '炒油麦菜', calories: 50, carbs: 5, protein: 3, fat: 2, category: '素菜', cuisine: '家常' },
  { id: 'v21', name: '炒生菜', calories: 45, carbs: 4, protein: 3, fat: 2, category: '素菜', cuisine: '家常' },
  { id: 'v22', name: '蚝油生菜', calories: 55, carbs: 4, protein: 3, fat: 3, category: '素菜', cuisine: '粤菜' },
  { id: 'v23', name: '白灼菜心', calories: 50, carbs: 5, protein: 3, fat: 2, category: '素菜', cuisine: '粤菜' },
  { id: 'v24', name: '清炒芥蓝', calories: 55, carbs: 6, protein: 3, fat: 2, category: '素菜', cuisine: '粤菜' },
  { id: 'v25', name: '上汤娃娃菜', calories: 80, carbs: 6, protein: 4, fat: 4, category: '素菜', cuisine: '粤菜' },
  { id: 'v26', name: '蒜蓉粉丝蒸娃娃菜', calories: 120, carbs: 16, protein: 3, fat: 5, category: '素菜', cuisine: '粤菜' },
  { id: 'v27', name: '红烧冬瓜', calories: 60, carbs: 8, protein: 1, fat: 3, category: '素菜', cuisine: '家常' },
  { id: 'v28', name: '蒸南瓜', calories: 70, carbs: 14, protein: 2, fat: 1, category: '素菜', cuisine: '家常' },
  { id: 'v29', name: '葱油芋艿', calories: 140, carbs: 22, protein: 3, fat: 5, category: '素菜', cuisine: '家常' },
  { id: 'v30', name: '拔丝红薯', calories: 280, carbs: 45, protein: 2, fat: 12, category: '素菜', cuisine: '家常' },
  { id: 'v31', name: '清炒芦笋', calories: 55, carbs: 6, protein: 4, fat: 2, category: '素菜', cuisine: '家常' },
  { id: 'v32', name: '蘑菇炒青菜', calories: 70, carbs: 8, protein: 4, fat: 3, category: '素菜', cuisine: '家常' },
  { id: 'v33', name: '香菇油菜', calories: 65, carbs: 7, protein: 4, fat: 3, category: '素菜', cuisine: '家常' },
  { id: 'v34', name: '干锅花菜', calories: 140, carbs: 10, protein: 5, fat: 8, category: '素菜', cuisine: '川菜' },
  { id: 'v35', name: '干锅土豆片', calories: 180, carbs: 22, protein: 3, fat: 8, category: '素菜', cuisine: '川菜' },
  { id: 'v36', name: '地三鲜', calories: 180, carbs: 18, protein: 4, fat: 10, category: '素菜', cuisine: '东北菜' },
  { id: 'v37', name: '虎皮青椒', calories: 90, carbs: 8, protein: 2, fat: 6, category: '素菜', cuisine: '川菜' },
  { id: 'v38', name: '家常豆腐', calories: 200, carbs: 10, protein: 12, fat: 12, category: '素菜', cuisine: '家常' },
  { id: 'v39', name: '麻婆豆腐(素)', calories: 180, carbs: 6, protein: 10, fat: 12, category: '素菜', cuisine: '川菜' },
  { id: 'v40', name: '红烧豆腐', calories: 170, carbs: 8, protein: 10, fat: 10, category: '素菜', cuisine: '家常' },
  { id: 'v41', name: '葱烧豆腐', calories: 160, carbs: 7, protein: 10, fat: 10, category: '素菜', cuisine: '鲁菜' },
  { id: 'v42', name: '锅塌豆腐', calories: 200, carbs: 8, protein: 12, fat: 12, category: '素菜', cuisine: '鲁菜' },
  { id: 'v43', name: '皮蛋豆腐', calories: 130, carbs: 4, protein: 10, fat: 8, category: '素菜', cuisine: '家常' },
  { id: 'v44', name: '凉拌豆腐', calories: 120, carbs: 3, protein: 10, fat: 7, category: '素菜', cuisine: '家常' },
  { id: 'v45', name: '韭菜炒蛋', calories: 180, carbs: 8, protein: 12, fat: 10, category: '素菜', cuisine: '家常' },
  { id: 'v46', name: '苦瓜炒蛋', calories: 140, carbs: 8, protein: 10, fat: 8, category: '素菜', cuisine: '家常' },
  { id: 'v47', name: '丝瓜炒蛋', calories: 130, carbs: 6, protein: 8, fat: 7, category: '素菜', cuisine: '家常' },
  { id: 'v48', name: '洋葱炒蛋', calories: 150, carbs: 10, protein: 10, fat: 8, category: '素菜', cuisine: '家常' },
  { id: 'v49', name: '香椿炒蛋', calories: 160, carbs: 5, protein: 12, fat: 10, category: '素菜', cuisine: '家常' },
  { id: 'v50', name: '凉拌黄瓜', calories: 40, carbs: 6, protein: 1, fat: 1, category: '素菜', cuisine: '家常' },
  { id: 'v51', name: '凉拌西红柿', calories: 55, carbs: 10, protein: 1, fat: 1, category: '素菜', cuisine: '家常' },
  { id: 'v52', name: '凉拌木耳', calories: 45, carbs: 6, protein: 2, fat: 1, category: '素菜', cuisine: '家常' },
  { id: 'v53', name: '凉拌海带丝', calories: 35, carbs: 4, protein: 2, fat: 1, category: '素菜', cuisine: '家常' },
  { id: 'v54', name: '凉拌三丝', calories: 80, carbs: 10, protein: 3, fat: 3, category: '素菜', cuisine: '家常' },
  { id: 'v55', name: '凉拌莴笋', calories: 40, carbs: 5, protein: 2, fat: 1, category: '素菜', cuisine: '家常' },
  { id: 'v56', name: '糖拌西红柿', calories: 80, carbs: 16, protein: 1, fat: 1, category: '素菜', cuisine: '家常' },
  { id: 'v57', name: '拍黄瓜', calories: 50, carbs: 6, protein: 2, fat: 2, category: '素菜', cuisine: '家常' },
  { id: 'v58', name: '蒜泥茄子', calories: 70, carbs: 8, protein: 2, fat: 3, category: '素菜', cuisine: '家常' },
  { id: 'v59', name: '蒸茄泥', calories: 55, carbs: 8, protein: 2, fat: 1, category: '素菜', cuisine: '家常' },
  { id: 'v60', name: '西芹百合', calories: 80, carbs: 12, protein: 3, fat: 2, category: '素菜', cuisine: '家常' },
  { id: 'v61', name: '荷塘小炒', calories: 100, carbs: 14, protein: 4, fat: 3, category: '素菜', cuisine: '粤菜' },
  { id: 'v62', name: '松仁玉米', calories: 200, carbs: 24, protein: 5, fat: 10, category: '素菜', cuisine: '家常' },
  { id: 'v63', name: '金沙玉米', calories: 240, carbs: 26, protein: 5, fat: 14, category: '素菜', cuisine: '川菜' },
  { id: 'v64', name: '蒜蓉秋葵', calories: 60, carbs: 8, protein: 3, fat: 3, category: '素菜', cuisine: '家常' },
  { id: 'v65', name: '白灼秋葵', calories: 50, carbs: 7, protein: 3, fat: 2, category: '素菜', cuisine: '粤菜' },
  { id: 'v66', name: '炒杏鲍菇', calories: 70, carbs: 8, protein: 3, fat: 3, category: '素菜', cuisine: '家常' },
  { id: 'v67', name: '蚝油杏鲍菇', calories: 80, carbs: 8, protein: 3, fat: 4, category: '素菜', cuisine: '粤菜' },
  { id: 'v68', name: '金针菇炒蛋', calories: 120, carbs: 6, protein: 8, fat: 7, category: '素菜', cuisine: '家常' },
  { id: 'v69', name: '蒜蓉金针菇', calories: 55, carbs: 6, protein: 3, fat: 3, category: '素菜', cuisine: '家常' },
  { id: 'v70', name: '炝炒圆白菜', calories: 60, carbs: 6, protein: 2, fat: 3, category: '素菜', cuisine: '家常' },
  { id: 'v71', name: '手撕包菜', calories: 90, carbs: 8, protein: 3, fat: 5, category: '素菜', cuisine: '湘菜' },
  { id: 'v72', name: '宫保杏鲍菇', calories: 150, carbs: 12, protein: 5, fat: 10, category: '素菜', cuisine: '川菜' },
  { id: 'v73', name: '素炒合菜', calories: 120, carbs: 14, protein: 5, fat: 5, category: '素菜', cuisine: '京菜' },
  { id: 'v74', name: '炒土豆片', calories: 130, carbs: 20, protein: 2, fat: 4, category: '素菜', cuisine: '家常' },
  { id: 'v75', name: '孜然土豆', calories: 160, carbs: 22, protein: 2, fat: 7, category: '素菜', cuisine: '家常' },
  { id: 'v76', name: '红烧素鸡', calories: 180, carbs: 8, protein: 14, fat: 10, category: '素菜', cuisine: '家常' },
  { id: 'v77', name: '卤豆干', calories: 140, carbs: 6, protein: 14, fat: 6, category: '素菜', cuisine: '家常' },
  { id: 'v78', name: '毛豆炒雪菜', calories: 120, carbs: 12, protein: 8, fat: 5, category: '素菜', cuisine: '家常' },
  { id: 'v79', name: '蚕豆炒韭菜', calories: 130, carbs: 14, protein: 6, fat: 5, category: '素菜', cuisine: '家常' },
  { id: 'v80', name: '豌豆炒肉末(素)', calories: 140, carbs: 16, protein: 6, fat: 5, category: '素菜', cuisine: '家常' },
  { id: 'v81', name: '蒜苗炒豆干', calories: 130, carbs: 10, protein: 8, fat: 6, category: '素菜', cuisine: '家常' },
  { id: 'v82', name: '芹菜炒香干', calories: 120, carbs: 8, protein: 8, fat: 6, category: '素菜', cuisine: '家常' },
  { id: 'v83', name: '酸辣藕丁', calories: 100, carbs: 16, protein: 3, fat: 3, category: '素菜', cuisine: '湘菜' },
  { id: 'v84', name: '清炒山药', calories: 90, carbs: 16, protein: 2, fat: 2, category: '素菜', cuisine: '家常' },
  { id: 'v85', name: '山药炒木耳', calories: 100, carbs: 18, protein: 3, fat: 2, category: '素菜', cuisine: '家常' },
  { id: 'v86', name: '红枣蒸南瓜', calories: 110, carbs: 22, protein: 2, fat: 2, category: '素菜', cuisine: '家常' },
  { id: 'v87', name: '粉蒸茼蒿', calories: 140, carbs: 18, protein: 4, fat: 5, category: '素菜', cuisine: '鄂菜' },
  { id: 'v88', name: '炸藕夹(素)', calories: 220, carbs: 20, protein: 4, fat: 14, category: '素菜', cuisine: '鄂菜' },
  { id: 'v89', name: '素春卷', calories: 180, carbs: 22, protein: 4, fat: 8, category: '素菜', cuisine: '家常' },
  { id: 'v90', name: '炸茄盒(素)', calories: 220, carbs: 18, protein: 4, fat: 14, category: '素菜', cuisine: '家常' },
  { id: 'v91', name: '糖醋藕片', calories: 120, carbs: 18, protein: 2, fat: 4, category: '素菜', cuisine: '家常' },
  { id: 'v92', name: '酸辣白菜', calories: 65, carbs: 6, protein: 2, fat: 3, category: '素菜', cuisine: '家常' },
  { id: 'v93', name: '松仁玉米(素)', calories: 180, carbs: 20, protein: 4, fat: 10, category: '素菜', cuisine: '家常' },
  { id: 'v94', name: '西芹百合炒腰果', calories: 200, carbs: 14, protein: 5, fat: 14, category: '素菜', cuisine: '粤菜' },
  { id: 'v95', name: '素炒饼', calories: 320, carbs: 46, protein: 8, fat: 10, category: '素菜', cuisine: '家常' },
  { id: 'v96', name: '炒方便面(素)', calories: 420, carbs: 52, protein: 8, fat: 20, category: '素菜', cuisine: '家常' },
  { id: 'v97', name: '芝士焗蔬菜', calories: 200, carbs: 10, protein: 10, fat: 14, category: '素菜', cuisine: '西餐' },
  { id: 'v98', name: '凯撒沙拉', calories: 150, carbs: 8, protein: 6, fat: 10, category: '素菜', cuisine: '西餐' },
  { id: 'v99', name: '希腊沙拉', calories: 130, carbs: 8, protein: 5, fat: 9, category: '素菜', cuisine: '西餐' },
  { id: 'v100', name: '田园沙拉', calories: 100, carbs: 10, protein: 4, fat: 5, category: '素菜', cuisine: '西餐' },
  { id: 'v101', name: '烤蔬菜', calories: 120, carbs: 14, protein: 3, fat: 6, category: '素菜', cuisine: '西餐' },
  { id: 'v102', name: '韩式泡菜', calories: 30, carbs: 6, protein: 2, fat: 1, category: '素菜', cuisine: '韩料' },
  { id: 'v103', name: '渍物(日式酱菜)', calories: 25, carbs: 4, protein: 1, fat: 0, category: '素菜', cuisine: '日料' },
  { id: 'v104', name: '毛豆(盐水煮)', calories: 130, carbs: 10, protein: 12, fat: 5, category: '素菜', cuisine: '家常' },
  { id: 'v105', name: '油炸花生米', calories: 320, carbs: 10, protein: 14, fat: 24, category: '素菜', cuisine: '家常' },
  { id: 'v106', name: '老醋花生', calories: 280, carbs: 14, protein: 12, fat: 18, category: '素菜', cuisine: '家常' },
  { id: 'v107', name: '蓝莓山药', calories: 150, carbs: 24, protein: 2, fat: 4, category: '素菜', cuisine: '京菜' },
  { id: 'v108', name: '桂花糯米藕', calories: 200, carbs: 36, protein: 4, fat: 4, category: '素菜', cuisine: '苏菜' },
  { id: 'v109', name: '蒸蛋羹', calories: 100, carbs: 2, protein: 8, fat: 6, category: '素菜', cuisine: '家常' },
  { id: 'v110', name: '茶叶蛋', calories: 90, carbs: 2, protein: 8, fat: 5, category: '素菜', cuisine: '家常' },
  { id: 'v111', name: '水煮蛋', calories: 80, carbs: 1, protein: 7, fat: 5, category: '素菜', cuisine: '通用' },
  { id: 'v112', name: '煎蛋', calories: 120, carbs: 1, protein: 8, fat: 9, category: '素菜', cuisine: '家常' },
  { id: 'v113', name: '温泉蛋', calories: 80, carbs: 1, protein: 7, fat: 5, category: '素菜', cuisine: '日料' },
  { id: 'v114', name: '溏心蛋', calories: 85, carbs: 1, protein: 7, fat: 5, category: '素菜', cuisine: '日料' },

  // ===== 汤品 (80道) =====
  { id: 't1', name: '番茄蛋汤', calories: 70, carbs: 6, protein: 4, fat: 3, category: '汤品', cuisine: '家常' },
  { id: 't2', name: '紫菜蛋花汤', calories: 45, carbs: 3, protein: 4, fat: 1, category: '汤品', cuisine: '家常' },
  { id: 't3', name: '菠菜蛋花汤', calories: 55, carbs: 4, protein: 4, fat: 2, category: '汤品', cuisine: '家常' },
  { id: 't4', name: '白菜豆腐汤', calories: 60, carbs: 4, protein: 4, fat: 2, category: '汤品', cuisine: '家常' },
  { id: 't5', name: '冬瓜汤', calories: 30, carbs: 4, protein: 1, fat: 1, category: '汤品', cuisine: '家常' },
  { id: 't6', name: '冬瓜排骨汤', calories: 150, carbs: 5, protein: 12, fat: 9, category: '汤品', cuisine: '家常' },
  { id: 't7', name: '萝卜排骨汤', calories: 160, carbs: 6, protein: 12, fat: 10, category: '汤品', cuisine: '家常' },
  { id: 't8', name: '玉米排骨汤', calories: 180, carbs: 14, protein: 14, fat: 10, category: '汤品', cuisine: '家常' },
  { id: 't9', name: '莲藕排骨汤', calories: 170, carbs: 14, protein: 14, fat: 8, category: '汤品', cuisine: '鄂菜' },
  { id: 't10', name: '海带排骨汤', calories: 140, carbs: 5, protein: 14, fat: 7, category: '汤品', cuisine: '家常' },
  { id: 't11', name: '鸡汤(1碗)', calories: 120, carbs: 2, protein: 14, fat: 6, category: '汤品', cuisine: '家常' },
  { id: 't12', name: '老母鸡汤', calories: 160, carbs: 2, protein: 18, fat: 8, category: '汤品', cuisine: '家常' },
  { id: 't13', name: '乌鸡汤', calories: 130, carbs: 3, protein: 16, fat: 6, category: '汤品', cuisine: '家常' },
  { id: 't14', name: '当归乌鸡汤', calories: 140, carbs: 4, protein: 16, fat: 7, category: '汤品', cuisine: '粤菜' },
  { id: 't15', name: '鱼头豆腐汤', calories: 140, carbs: 4, protein: 16, fat: 6, category: '汤品', cuisine: '家常' },
  { id: 't16', name: '鲫鱼豆腐汤', calories: 130, carbs: 4, protein: 16, fat: 5, category: '汤品', cuisine: '家常' },
  { id: 't17', name: '番茄牛腩汤', calories: 180, carbs: 8, protein: 18, fat: 8, category: '汤品', cuisine: '家常' },
  { id: 't18', name: '牛肉萝卜汤', calories: 160, carbs: 6, protein: 20, fat: 6, category: '汤品', cuisine: '家常' },
  { id: 't19', name: '羊肉汤', calories: 180, carbs: 3, protein: 16, fat: 12, category: '汤品', cuisine: '西北菜' },
  { id: 't20', name: '羊杂汤', calories: 160, carbs: 4, protein: 18, fat: 8, category: '汤品', cuisine: '西北菜' },
  { id: 't21', name: '汆丸子汤', calories: 140, carbs: 4, protein: 14, fat: 8, category: '汤品', cuisine: '家常' },
  { id: 't22', name: '西湖牛肉羹', calories: 110, carbs: 6, protein: 10, fat: 5, category: '汤品', cuisine: '浙菜' },
  { id: 't23', name: '宋嫂鱼羹', calories: 100, carbs: 5, protein: 12, fat: 4, category: '汤品', cuisine: '浙菜' },
  { id: 't24', name: '酸辣汤', calories: 80, carbs: 8, protein: 4, fat: 3, category: '汤品', cuisine: '川菜' },
  { id: 't25', name: '胡辣汤', calories: 120, carbs: 14, protein: 6, fat: 4, category: '汤品', cuisine: '豫菜' },
  { id: 't26', name: '酸汤鱼(汤)', calories: 90, carbs: 4, protein: 14, fat: 3, category: '汤品', cuisine: '黔菜' },
  { id: 't27', name: '冬阴功汤', calories: 90, carbs: 6, protein: 8, fat: 4, category: '汤品', cuisine: '东南亚' },
  { id: 't28', name: '椰汁鸡汤', calories: 160, carbs: 5, protein: 14, fat: 10, category: '汤品', cuisine: '东南亚' },
  { id: 't29', name: '罗宋汤', calories: 140, carbs: 14, protein: 6, fat: 6, category: '汤品', cuisine: '西餐' },
  { id: 't30', name: '奶油蘑菇汤', calories: 180, carbs: 10, protein: 5, fat: 13, category: '汤品', cuisine: '西餐' },
  { id: 't31', name: '南瓜浓汤', calories: 120, carbs: 16, protein: 3, fat: 5, category: '汤品', cuisine: '西餐' },
  { id: 't32', name: '玉米浓汤', calories: 130, carbs: 16, protein: 4, fat: 6, category: '汤品', cuisine: '西餐' },
  { id: 't33', name: '法式洋葱汤', calories: 110, carbs: 10, protein: 4, fat: 6, category: '汤品', cuisine: '西餐' },
  { id: 't34', name: '味噌汤', calories: 55, carbs: 4, protein: 4, fat: 2, category: '汤品', cuisine: '日料' },
  { id: 't35', name: '日式清汤', calories: 35, carbs: 3, protein: 2, fat: 1, category: '汤品', cuisine: '日料' },
  { id: 't36', name: '大酱汤', calories: 80, carbs: 8, protein: 6, fat: 3, category: '汤品', cuisine: '韩料' },
  { id: 't37', name: '韩式泡菜汤', calories: 90, carbs: 6, protein: 6, fat: 5, category: '汤品', cuisine: '韩料' },
  { id: 't38', name: '嫩豆腐汤', calories: 80, carbs: 5, protein: 6, fat: 4, category: '汤品', cuisine: '韩料' },
  { id: 't39', name: '豆芽汤', calories: 35, carbs: 4, protein: 3, fat: 1, category: '汤品', cuisine: '韩料' },
  { id: 't40', name: '老鸭汤', calories: 140, carbs: 2, protein: 14, fat: 8, category: '汤品', cuisine: '家常' },
  { id: 't41', name: '酸萝卜老鸭汤', calories: 150, carbs: 4, protein: 14, fat: 9, category: '汤品', cuisine: '川菜' },
  { id: 't42', name: '竹笋老鸭汤', calories: 140, carbs: 5, protein: 14, fat: 7, category: '汤品', cuisine: '浙菜' },
  { id: 't43', name: '椰子鸡汤', calories: 180, carbs: 6, protein: 16, fat: 10, category: '汤品', cuisine: '琼菜' },
  { id: 't44', name: '银耳莲子汤', calories: 100, carbs: 18, protein: 2, fat: 2, category: '汤品', cuisine: '粤菜' },
  { id: 't45', name: '红豆汤', calories: 120, carbs: 22, protein: 5, fat: 1, category: '汤品', cuisine: '家常' },
  { id: 't46', name: '绿豆汤', calories: 90, carbs: 18, protein: 4, fat: 0, category: '汤品', cuisine: '家常' },
  { id: 't47', name: '八宝粥', calories: 200, carbs: 40, protein: 5, fat: 3, category: '汤品', cuisine: '家常' },
  { id: 't48', name: '小米粥', calories: 100, carbs: 18, protein: 3, fat: 2, category: '汤品', cuisine: '家常' },
  { id: 't49', name: '皮蛋瘦肉粥', calories: 180, carbs: 22, protein: 12, fat: 6, category: '汤品', cuisine: '粤菜' },
  { id: 't50', name: '生滚鱼片粥', calories: 160, carbs: 20, protein: 12, fat: 4, category: '汤品', cuisine: '粤菜' },
  { id: 't51', name: '香菇鸡肉粥', calories: 170, carbs: 20, protein: 14, fat: 5, category: '汤品', cuisine: '家常' },
  { id: 't52', name: '排骨粥', calories: 200, carbs: 22, protein: 14, fat: 7, category: '汤品', cuisine: '粤菜' },
  { id: 't53', name: '白粥(1碗)', calories: 80, carbs: 18, protein: 2, fat: 0.5, category: '汤品', cuisine: '通用' },
  { id: 't54', name: '南瓜粥', calories: 110, carbs: 22, protein: 2, fat: 2, category: '汤品', cuisine: '家常' },
  { id: 't55', name: '山药粥', calories: 120, carbs: 24, protein: 3, fat: 2, category: '汤品', cuisine: '家常' },
  { id: 't56', name: '红枣桂圆汤', calories: 130, carbs: 28, protein: 2, fat: 1, category: '汤品', cuisine: '粤菜' },
  { id: 't57', name: '冰糖雪梨汤', calories: 90, carbs: 22, protein: 0, fat: 0, category: '汤品', cuisine: '家常' },
  { id: 't58', name: '酸梅汤', calories: 60, carbs: 14, protein: 0, fat: 0, category: '汤品', cuisine: '京菜' },
  { id: 't59', name: '米酒蛋花汤', calories: 140, carbs: 20, protein: 5, fat: 4, category: '汤品', cuisine: '家常' },
  { id: 't60', name: '疙瘩汤', calories: 160, carbs: 24, protein: 6, fat: 4, category: '汤品', cuisine: '家常' },
  { id: 't61', name: '豆腐脑(咸)', calories: 80, carbs: 6, protein: 6, fat: 3, category: '汤品', cuisine: '小吃' },
  { id: 't62', name: '豆腐脑(甜)', calories: 120, carbs: 20, protein: 5, fat: 2, category: '汤品', cuisine: '小吃' },
  { id: 't63', name: '豆汁', calories: 30, carbs: 5, protein: 2, fat: 0, category: '汤品', cuisine: '京菜' },
  { id: 't64', name: '肉骨茶', calories: 220, carbs: 6, protein: 22, fat: 12, category: '汤品', cuisine: '东南亚' },
  { id: 't65', name: '排骨藕汤(鄂式)', calories: 170, carbs: 14, protein: 14, fat: 7, category: '汤品', cuisine: '鄂菜' },
  { id: 't66', name: '花生猪蹄汤', calories: 200, carbs: 6, protein: 14, fat: 14, category: '汤品', cuisine: '粤菜' },
  { id: 't67', name: '四神汤', calories: 130, carbs: 16, protein: 8, fat: 4, category: '汤品', cuisine: '台湾菜' },
  { id: 't68', name: '酸菜白肉汤', calories: 160, carbs: 4, protein: 12, fat: 10, category: '汤品', cuisine: '东北菜' },
  { id: 't69', name: '萝卜丝汆丸子汤', calories: 140, carbs: 6, protein: 12, fat: 7, category: '汤品', cuisine: '家常' },
  { id: 't70', name: '菌菇汤', calories: 60, carbs: 8, protein: 4, fat: 2, category: '汤品', cuisine: '家常' },
  { id: 't71', name: '番茄菌菇汤', calories: 70, carbs: 10, protein: 4, fat: 2, category: '汤品', cuisine: '家常' },
  { id: 't72', name: '菠菜猪肝汤', calories: 100, carbs: 5, protein: 12, fat: 3, category: '汤品', cuisine: '家常' },
  { id: 't73', name: '青菜豆腐汤', calories: 50, carbs: 3, protein: 4, fat: 2, category: '汤品', cuisine: '家常' },
  { id: 't74', name: '丝瓜蛋汤', calories: 65, carbs: 5, protein: 5, fat: 3, category: '汤品', cuisine: '家常' },
  { id: 't75', name: '榨菜肉丝汤', calories: 70, carbs: 5, protein: 6, fat: 3, category: '汤品', cuisine: '家常' },
  { id: 't76', name: '三鲜汤', calories: 90, carbs: 6, protein: 8, fat: 5, category: '汤品', cuisine: '家常' },

  // ===== 小吃 (60道) =====
  { id: 'x1', name: '烤红薯', calories: 180, carbs: 40, protein: 3, fat: 1, category: '小吃', cuisine: '小吃' },
  { id: 'x2', name: '蒸玉米', calories: 140, carbs: 28, protein: 5, fat: 2, category: '小吃', cuisine: '小吃' },
  { id: 'x3', name: '虾饺(4个)', calories: 180, carbs: 22, protein: 10, fat: 6, category: '小吃', cuisine: '粤菜' },
  { id: 'x4', name: '烧卖(4个)', calories: 220, carbs: 24, protein: 10, fat: 10, category: '小吃', cuisine: '粤菜' },
  { id: 'x5', name: '蛋挞(2个)', calories: 280, carbs: 30, protein: 6, fat: 16, category: '小吃', cuisine: '粤菜' },
  { id: 'x6', name: '糯米鸡', calories: 350, carbs: 40, protein: 14, fat: 16, category: '小吃', cuisine: '粤菜' },
  { id: 'x7', name: '萝卜糕(2块)', calories: 180, carbs: 24, protein: 4, fat: 8, category: '小吃', cuisine: '粤菜' },
  { id: 'x8', name: '肠粉(斋)', calories: 180, carbs: 28, protein: 4, fat: 5, category: '小吃', cuisine: '粤菜' },
  { id: 'x9', name: '流沙包(2个)', calories: 280, carbs: 36, protein: 8, fat: 12, category: '小吃', cuisine: '粤菜' },
  { id: 'x10', name: '马蹄糕(2块)', calories: 150, carbs: 30, protein: 2, fat: 2, category: '小吃', cuisine: '粤菜' },
  { id: 'x11', name: '春卷(4个)', calories: 280, carbs: 30, protein: 8, fat: 14, category: '小吃', cuisine: '家常' },
  { id: 'x12', name: '炸云吞(6个)', calories: 280, carbs: 22, protein: 12, fat: 16, category: '小吃', cuisine: '粤菜' },
  { id: 'x13', name: '煎饺(6个)', calories: 260, carbs: 24, protein: 14, fat: 12, category: '小吃', cuisine: '家常' },
  { id: 'x14', name: '章鱼烧(6个)', calories: 300, carbs: 32, protein: 10, fat: 14, category: '小吃', cuisine: '日料' },
  { id: 'x15', name: '大阪烧', calories: 350, carbs: 36, protein: 12, fat: 18, category: '小吃', cuisine: '日料' },
  { id: 'x16', name: '铜锣烧(2个)', calories: 260, carbs: 42, protein: 6, fat: 8, category: '小吃', cuisine: '日料' },
  { id: 'x17', name: '鲷鱼烧', calories: 220, carbs: 32, protein: 5, fat: 8, category: '小吃', cuisine: '日料' },
  { id: 'x18', name: '韩式辣炒年糕', calories: 300, carbs: 48, protein: 5, fat: 8, category: '小吃', cuisine: '韩料' },
  { id: 'x19', name: '韩式鱼饼串(2串)', calories: 150, carbs: 16, protein: 10, fat: 5, category: '小吃', cuisine: '韩料' },
  { id: 'x20', name: '糖葫芦', calories: 150, carbs: 35, protein: 1, fat: 1, category: '小吃', cuisine: '京菜' },
  { id: 'x21', name: '驴打滚', calories: 220, carbs: 40, protein: 4, fat: 5, category: '小吃', cuisine: '京菜' },
  { id: 'x22', name: '豌豆黄', calories: 140, carbs: 28, protein: 5, fat: 2, category: '小吃', cuisine: '京菜' },
  { id: 'x23', name: '艾窝窝', calories: 180, carbs: 36, protein: 3, fat: 3, category: '小吃', cuisine: '京菜' },
  { id: 'x24', name: '甑糕', calories: 240, carbs: 48, protein: 4, fat: 3, category: '小吃', cuisine: '西北菜' },
  { id: 'x25', name: '肉松饼(2个)', calories: 260, carbs: 28, protein: 8, fat: 14, category: '小吃', cuisine: '台湾菜' },
  { id: 'x26', name: '凤梨酥(2个)', calories: 220, carbs: 28, protein: 3, fat: 11, category: '小吃', cuisine: '台湾菜' },
  { id: 'x27', name: '太阳饼(2个)', calories: 240, carbs: 30, protein: 4, fat: 12, category: '小吃', cuisine: '台湾菜' },
  { id: 'x28', name: '牛舌饼(2个)', calories: 200, carbs: 28, protein: 4, fat: 8, category: '小吃', cuisine: '台湾菜' },
  { id: 'x29', name: '老婆饼(2个)', calories: 260, carbs: 32, protein: 4, fat: 13, category: '小吃', cuisine: '粤菜' },
  { id: 'x30', name: '绿豆糕(2块)', calories: 200, carbs: 30, protein: 5, fat: 7, category: '小吃', cuisine: '家常' },
  { id: 'x31', name: '桂花糕(2块)', calories: 180, carbs: 34, protein: 3, fat: 4, category: '小吃', cuisine: '苏菜' },
  { id: 'x32', name: '定胜糕', calories: 200, carbs: 38, protein: 5, fat: 3, category: '小吃', cuisine: '苏菜' },
  { id: 'x33', name: '酒酿圆子', calories: 180, carbs: 36, protein: 3, fat: 2, category: '小吃', cuisine: '苏菜' },
  { id: 'x34', name: '双皮奶', calories: 130, carbs: 14, protein: 5, fat: 6, category: '小吃', cuisine: '粤菜' },
  { id: 'x35', name: '姜撞奶', calories: 120, carbs: 12, protein: 4, fat: 5, category: '小吃', cuisine: '粤菜' },
  { id: 'x36', name: '杨枝甘露', calories: 150, carbs: 24, protein: 2, fat: 5, category: '小吃', cuisine: '粤菜' },
  { id: 'x37', name: '芋圆仙草冻', calories: 160, carbs: 30, protein: 2, fat: 3, category: '小吃', cuisine: '台湾菜' },
  { id: 'x38', name: '冰粉', calories: 80, carbs: 18, protein: 0, fat: 0, category: '小吃', cuisine: '川菜' },
  { id: 'x39', name: '凉虾', calories: 100, carbs: 24, protein: 1, fat: 1, category: '小吃', cuisine: '鄂菜' },
  { id: 'x40', name: '龟苓膏', calories: 60, carbs: 14, protein: 1, fat: 0, category: '小吃', cuisine: '粤菜' },
  { id: 'x41', name: '臭豆腐(炸)', calories: 250, carbs: 14, protein: 10, fat: 16, category: '小吃', cuisine: '湘菜' },
  { id: 'x42', name: '烤冷面', calories: 320, carbs: 38, protein: 10, fat: 14, category: '小吃', cuisine: '东北菜' },
  { id: 'x43', name: '铁板豆腐', calories: 150, carbs: 8, protein: 10, fat: 8, category: '小吃', cuisine: '小吃' },
  { id: 'x44', name: '炸鸡排', calories: 380, carbs: 20, protein: 22, fat: 24, category: '小吃', cuisine: '台湾菜' },
  { id: 'x45', name: '甘梅地瓜', calories: 220, carbs: 35, protein: 2, fat: 8, category: '小吃', cuisine: '台湾菜' },
  { id: 'x46', name: '花生卷冰淇淋', calories: 200, carbs: 22, protein: 4, fat: 11, category: '小吃', cuisine: '台湾菜' },
  { id: 'x47', name: '芒果糯米饭', calories: 260, carbs: 44, protein: 4, fat: 8, category: '小吃', cuisine: '东南亚' },
  { id: 'x48', name: '泰式春卷(鲜)', calories: 120, carbs: 16, protein: 6, fat: 3, category: '小吃', cuisine: '东南亚' },
  { id: 'x49', name: '越南春卷', calories: 100, carbs: 14, protein: 5, fat: 2, category: '小吃', cuisine: '东南亚' },
  { id: 'x50', name: '沙爹肉串(5串)', calories: 280, carbs: 10, protein: 24, fat: 16, category: '小吃', cuisine: '东南亚' },
  { id: 'x51', name: '印度飞饼', calories: 320, carbs: 38, protein: 8, fat: 16, category: '小吃', cuisine: '印度菜' },
  { id: 'x52', name: '萨摩萨(3个)', calories: 280, carbs: 30, protein: 8, fat: 14, category: '小吃', cuisine: '印度菜' },
  { id: 'x53', name: '土耳其烤肉卷', calories: 420, carbs: 36, protein: 24, fat: 20, category: '小吃', cuisine: '中东' },
  { id: 'x54', name: '法拉费(Falafel)', calories: 260, carbs: 30, protein: 12, fat: 10, category: '小吃', cuisine: '中东' },
  { id: 'x55', name: '烤串(5串)', calories: 320, carbs: 4, protein: 24, fat: 24, category: '小吃', cuisine: '烧烤' },
  { id: 'x56', name: '烤鸡翅(4个)', calories: 290, carbs: 6, protein: 22, fat: 20, category: '小吃', cuisine: '烧烤' },
  { id: 'x57', name: '烤鱿鱼', calories: 160, carbs: 4, protein: 24, fat: 5, category: '小吃', cuisine: '烧烤' },
  { id: 'x58', name: '烤茄子', calories: 120, carbs: 10, protein: 3, fat: 8, category: '小吃', cuisine: '烧烤' },
  { id: 'x59', name: '烤韭菜', calories: 60, carbs: 5, protein: 3, fat: 3, category: '小吃', cuisine: '烧烤' },
  { id: 'x60', name: '烤馒头片', calories: 200, carbs: 35, protein: 6, fat: 4, category: '小吃', cuisine: '烧烤' },
];

// ===== 推荐算法 =====

interface RecResult {
  foods: { food: { name: string; category: string; cuisine: string }; amount: number; calories: number; carbs: number; protein: number; fat: number }[];
  totalCalories: number;
  totalCarbs: number;
  totalProtein: number;
  totalFat: number;
  carbPct: number;
  proteinPct: number;
  fatPct: number;
  targetCal: number;
  exactMatch: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function recommendMeal(targetCal: number, personCount: number, region: string = 'all'): RecResult {
  let recipes = [...recipeDB];

  if (region === 'north') {
    recipes = recipes.filter((r) =>
      r.cuisine === '通用' || r.cuisine === '家常' || northCuisines.includes(r.cuisine) || r.cuisine === '小吃' || r.cuisine === '烧烤'
    );
  } else if (region === 'south') {
    recipes = recipes.filter((r) =>
      r.cuisine === '通用' || r.cuisine === '家常' || southCuisines.includes(r.cuisine) || r.cuisine === '小吃' || r.cuisine === '烧烤'
    );
  }

  // Score a combo: lower = better
  const score = (combo: Recipe[], target: number): number => {
    const total = combo.reduce((s, r) => s + r.calories, 0);
    const calError = Math.abs(total - target) / target;
    if (calError <= 50 / target) return calError; // within 50 kcal = great
    return calError;
  };

  // Try finding best combo of exactly N dishes
  const tryN = (n: number): { combo: Recipe[]; total: number } | null => {
    let best: Recipe[] = [];
    let bestScore = Infinity;

    if (n === 1) {
      for (const r of recipes) {
        const s = score([r], targetCal);
        if (s < bestScore) { bestScore = s; best = [r]; }
      }
      return best.length > 0 ? { combo: best, total: best[0].calories } : null;
    }

    // For N >= 2: use larger shuffled pools for variety
    const shuffled = shuffle(recipes);
    const pool = shuffled.slice(0, Math.min(200, shuffled.length));
    const len = pool.length;

    if (n === 2) {
      for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < Math.min(len, i + 100); j++) {
          const s = score([pool[i], pool[j]], targetCal);
          if (s < bestScore) { bestScore = s; best = [pool[i], pool[j]]; }
        }
      }
      return best.length > 0 ? { combo: best, total: best.reduce((s, r) => s + r.calories, 0) } : null;
    }

    if (n === 3) {
      const pool3 = shuffled.slice(0, Math.min(100, shuffled.length));
      for (let i = 0; i < pool3.length; i++) {
        for (let j = i + 1; j < Math.min(pool3.length, i + 50); j++) {
          for (let k = j + 1; k < Math.min(pool3.length, j + 50); k++) {
            const s = score([pool3[i], pool3[j], pool3[k]], targetCal);
            if (s < bestScore) { bestScore = s; best = [pool3[i], pool3[j], pool3[k]]; }
            if (bestScore <= 50 / targetCal) break;
          }
          if (bestScore <= 50 / targetCal) break;
        }
        if (bestScore <= 50 / targetCal) break;
      }
      return best.length > 0 ? { combo: best, total: best.reduce((s, r) => s + r.calories, 0) } : null;
    }

    if (n >= 4) {
      const pool4 = shuffled.slice(0, Math.min(60, shuffled.length));
      for (let i = 0; i < pool4.length; i++) {
        for (let j = i + 1; j < Math.min(pool4.length, i + 30); j++) {
          for (let k = j + 1; k < Math.min(pool4.length, j + 30); k++) {
            for (let l = k + 1; l < Math.min(pool4.length, k + 20); l++) {
              const combo = [pool4[i], pool4[j], pool4[k], pool4[l]];
              if (n === 5) {
                for (let m = l + 1; m < Math.min(pool4.length, l + 20); m++) {
                  const s = score([...combo, pool4[m]], targetCal);
                  if (s < bestScore) { bestScore = s; best = [...combo, pool4[m]]; }
                  if (bestScore <= 50 / targetCal) break;
                }
              } else {
                const s = score(combo, targetCal);
                if (s < bestScore) { bestScore = s; best = combo; }
              }
              if (bestScore <= 50 / targetCal) break;
            }
            if (bestScore <= 50 / targetCal) break;
          }
          if (bestScore <= 50 / targetCal) break;
        }
        if (bestScore <= 50 / targetCal) break;
      }
      return best.length > 0 ? { combo: best, total: best.reduce((s, r) => s + r.calories, 0) } : null;
    }

    return null;
  };

  if (personCount === 1) {
    // Personal: try 1, 2, or 3 dishes - pick the best overall
    let bestResult: { combo: Recipe[]; total: number } | null = null;
    let bestDiff = Infinity;

    for (const n of [1, 2, 3]) {
      const result = tryN(n);
      if (result) {
        const diff = Math.abs(result.total - targetCal);
        if (diff < bestDiff) { bestResult = result; bestDiff = diff; }
        if (diff <= 50) break; // good enough
      }
    }
    if (bestResult) {
      return buildResult(bestResult.combo, targetCal, bestDiff <= 50);
    }
  } else {
    // Family: try 2, 3, 4, or 5 dishes - pick the best
    let bestResult: { combo: Recipe[]; total: number } | null = null;
    let bestDiff = Infinity;

    for (const n of [2, 3, 4, 5]) {
      const result = tryN(n);
      if (result) {
        const diff = Math.abs(result.total - targetCal);
        if (diff < bestDiff) { bestResult = result; bestDiff = diff; }
        if (diff <= 50) break;
      }
    }
    if (bestResult) {
      return buildResult(bestResult.combo, targetCal, bestDiff <= 50);
    }
  }

  // Fallback
  const fallback = shuffle(recipes).slice(0, 3);
  return buildResult(fallback, targetCal, false);
}

function buildResult(dishes: Recipe[], targetCal: number, exactMatch: boolean): RecResult {
  const foods = dishes.map((r) => ({
    food: { name: r.name, category: r.category, cuisine: r.cuisine },
    amount: 1,
    calories: r.calories,
    carbs: r.carbs,
    protein: r.protein,
    fat: r.fat,
  }));

  const totalCal = foods.reduce((s, f) => s + f.calories, 0);
  const totalCarbs = Math.round(foods.reduce((s, f) => s + f.carbs, 0));
  const totalProtein = Math.round(foods.reduce((s, f) => s + f.protein, 0));
  const totalFat = Math.round(foods.reduce((s, f) => s + f.fat, 0));

  const carbCals = totalCarbs * 4;
  const proteinCals = totalProtein * 4;
  const fatCals = totalFat * 9;
  const totalMacroCals = carbCals + proteinCals + fatCals || 1;

  return {
    foods,
    totalCalories: totalCal,
    totalCarbs,
    totalProtein,
    totalFat,
    carbPct: Math.round((carbCals / totalMacroCals) * 100),
    proteinPct: Math.round((proteinCals / totalMacroCals) * 100),
    fatPct: Math.round((fatCals / totalMacroCals) * 100),
    targetCal,
    exactMatch: exactMatch || Math.abs(totalCal - targetCal) <= 50,
  };
}

import { StoredUser, UserRole, TreatmentProduct, CarouselSlide, FarmingTip, DiseaseInfo, CropInfo, Order, Notification } from '../types';

// --- USERS ---
export const initialUsers: { [key: string]: StoredUser } = {
  'saleh': { id: 'user1', name: 'صالح الأحمدي', username: 'saleh', role: UserRole.FARMER, password: 'password123', phone: '777-0101' },
  'aisha': { id: 'user2', name: 'عائشة محمد', username: 'aisha', role: UserRole.MERCHANT, password: 'password123', phone: '777-0102' },
};

// --- CROPS ---
export const mockCropInfo: CropInfo[] = [
    { id: 'coffee', name: 'البُن اليمني', description: 'يُعتبر البن اليمني من أجود أنواع البن في العالم، ويتميز بنكهته الفريدة والغنية. يُزرع في المرتفعات الجبلية ويحتاج إلى عناية خاصة للحفاظ على جودته.', imageUrl: 'https://images.unsplash.com/photo-1599819122046-e5d78b87137a?q=80&w=1974&auto=format&fit=crop', farmingInfo: 'يُفضل زراعته في تربة جيدة التصريف وعلى ارتفاعات تتراوح بين 1000 و 2000 متر. يتطلب ريًا منتظمًا وحماية من الصقيع.' },
    { id: 'almonds', name: 'اللوز اليمني', description: 'اللوز من المحاصيل الهامة في اليمن، خاصة في المناطق الجبلية. يتميز بقيمته الغذائية العالية ويستخدم في العديد من الأطباق والحلويات اليمنية.', imageUrl: 'https://images.unsplash.com/photo-1627522149838-895c6604924c?q=80&w=1964&auto=format&fit=crop', farmingInfo: 'شجرة اللوز تتحمل الجفاف نسبيًا وتنمو جيدًا في المناخات المعتدلة. تحتاج إلى تقليم دوري لزيادة الإنتاج.' },
    { id: 'pomegranate', name: 'الرمان الصعدي', description: 'الرمان اليمني، وخاصة الصعدي، مشهور بحجمه الكبير وحلاوة طعمه. يُعد مصدرًا غنيًا بمضادات الأكسدة والفيتامينات.', imageUrl: 'https://images.unsplash.com/photo-1631704253683-45a822603487?q=80&w=1964&auto=format&fit=crop', farmingInfo: 'ينمو الرمان في مختلف أنواع التربة ولكنه يفضل التربة العميقة والخصبة. يحتاج إلى شمس كاملة وري منتظم خلال فترة الإثمار.' },
    { id: 'tomatoes', name: 'الطماطم', description: 'تُعتبر الطماطم من الخضروات الأساسية في المطبخ اليمني وتُزرع في مناطق مختلفة من البلاد. تدخل في تحضير معظم الأطباق اليومية.', imageUrl: 'https://images.unsplash.com/photo-1598512752271-33f913a5af13?q=80&w=1974&auto=format&fit=crop', farmingInfo: 'تحتاج الطماطم إلى تربة غنية بالمواد العضوية وإلى دعم النباتات بأعمدة لتنمو بشكل جيد. يجب الانتباه لمكافحة الآفات مثل ذبابة الفاكهة.' },
];

// --- CAROUSEL ---
export const mockSlides: CarouselSlide[] = [
    { cropId: 'coffee', image: 'https://images.unsplash.com/photo-1599819122046-e5d78b87137a?q=80&w=1974&auto=format&fit=crop', title: 'البُن اليمني', subtitle: 'جودة عالمية تبدأ من أرضنا' },
    { cropId: 'almonds', image: 'https://images.unsplash.com/photo-1627522149838-895c6604924c?q=80&w=1964&auto=format&fit=crop', title: 'اللوز', subtitle: 'غذاء الطبيعة من مزارع اليمن' },
    { cropId: 'pomegranate', image: 'https://images.unsplash.com/photo-1631704253683-45a822603487?q=80&w=1964&auto=format&fit=crop', title: 'الرمان', subtitle: 'ثمار مباركة من أرض طيبة' },
    { cropId: 'tomatoes', image: 'https://images.unsplash.com/photo-1598512752271-33f913a5af13?q=80&w=1974&auto=format&fit=crop', title: 'الطماطم', subtitle: 'أساس المائدة اليمنية' },
];

// --- SHOP ---
export const mockProducts: TreatmentProduct[] = [
    { id: 'p1', name: 'مبيد فطري عضوي', description: 'فعال ضد البياض الدقيقي والزغبي. آمن على البيئة ومناسب للزراعة العضوية. يتم رشه كل 15 يومًا للوقاية.', price: 1500, imageUrl: 'https://i.ibb.co/Jq0bJtV/organic-fungicide.jpg', merchantId: 'user2', status: 'approved' },
    { id: 'p2', name: 'سماد نيتروجيني', description: 'لزيادة النمو الخضري وتقوية أوراق النباتات. مثالي لمراحل النمو الأولى. يضاف مع مياه الري.', price: 2500, imageUrl: 'https://i.ibb.co/yQxG8G0/nitrogen-fertilizer.jpg', merchantId: 'user2', status: 'approved' },
    { id: 'p3', name: 'زيت النيم', description: 'مكافح طبيعي للحشرات والآفات مثل المن والعناكب. يعمل كطارد ومنظم لنمو الحشرات. يُخلط بالماء والصابون ويرش على الأوراق.', price: 2000, imageUrl: 'https://i.ibb.co/1M2yqY1/neem-oil.jpg', merchantId: 'user2', status: 'approved' },
    { id: 'p4', name: 'مبيد حشري', description: 'فعال للقضاء على المن والذبابة البيضاء. تأثير سريع وفعالية عالية. يجب اتباع تعليمات السلامة عند الاستخدام.', price: 1800, imageUrl: 'https://i.ibb.co/zV7HhV0/insecticide.jpg', merchantId: 'user2', status: 'approved' },
];

// --- FARMING TIPS ---
export const mockFarmingTips: FarmingTip[] = [
    { id: 'tip1', title: 'الري بالتنقيط', content: 'استخدام نظام الري بالتنقيط يوفر ما يصل إلى 70% من المياه مقارنة بالري بالغمر، ويقلل من نمو الأعشاب الضارة.' },
    { id: 'tip2', title: 'التسميد العضوي', content: 'استخدام الكمبوست والمخلفات الحيوانية كسماد عضوي يحسن من خصوبة التربة وبنيتها، ويزود النباتات بالعناصر الغذائية بشكل مستدام.' },
    { id: 'tip3', title: 'الدورة الزراعية', content: 'تناوب المحاصيل في نفس الحقل من موسم لآخر يساعد على كسر دورة الآفات والأمراض ويحافظ على توازن العناصر الغذائية في التربة.' },
    { id: 'tip4', title: 'مكافحة الآفات الطبيعية', content: 'تشجيع وجود الأعداء الطبيعيين للآفات مثل حشرة "الدعسوقة" التي تتغذى على المن، يقلل من الحاجة لاستخدام المبيدات الكيميائية.' },
    { id: 'tip5', title: 'فحص المحصول الدوري', content: 'تفقد النباتات بانتظام يساعد على اكتشاف الأمراض والآفات في مراحلها المبكرة، مما يجعل السيطرة عليها أسهل وأكثر فعالية.' },
];

// --- DISEASE INFO ---
export const mockDiseaseInfo: DiseaseInfo[] = [
    { id: 'dis1', name: 'البياض الدقيقي', description: 'مرض فطري يظهر كطبقة بيضاء تشبه الدقيق على الأوراق والسيقان، ويصيب مجموعة واسعة من النباتات مثل الخيار والعنب والمانجو. يزدهر في الظروف الدافئة والجافة.', treatment: 'تحسين التهوية حول النباتات. استخدام مبيدات فطرية تحتوي على الكبريت أو بيكربونات البوتاسيوم. للعلاج العضوي، يمكن رش محلول من الحليب (جزء حليب مقابل 9 أجزاء ماء). يجب إزالة الأجزاء المصابة بشدة.' },
    { id: 'dis2', name: 'صدأ الأوراق', description: 'يظهر على شكل بقع أو بثرات برتقالية أو بنية اللون على الأوراق، وتحتوي على جراثيم الفطر. يسبب تساقط الأوراق المبكر ويضعف النبات. شائع في الحبوب مثل القمح والشعير، وكذلك البن.', treatment: 'زراعة أصناف مقاومة للمرض. استخدام مبيدات فطرية نحاسية أو جهازية مثل التي تحتوي على التريازولات. ضمان تهوية جيدة بين النباتات لتقليل الرطوبة وإزالة الأوراق المصابة أولاً بأول.' },
    { id: 'dis3', name: 'اللفحة المتأخرة (على الطماطم والبطاطس)', description: 'مرض فطري خطير يسبب بقعًا داكنة على الأوراق والسيقان، وتلفًا سريعًا للثمار. ينتشر بسرعة في الطقس البارد والرطب ويمكن أن يدمر محصولًا كاملاً في أيام.', treatment: 'الرش الوقائي بالمبيدات الفطرية الجهازية مثل المانكوزيب. التخلص الفوري من النباتات المصابة وحرقها. تجنب ري الأوراق مباشرة والزراعة في أماكن جيدة التصريف.' },
    { id: 'dis4', name: 'تجعد أوراق الخوخ', description: 'يصيب أشجار الخوخ واللوز، ويسبب تجعدًا وتشوهًا في الأوراق الجديدة وتغير لونها إلى الأحمر أو الأصفر. الفطر المسبب له يبقى كامنًا على الأغصان والبراعم.', treatment: 'العلاج يكون وقائيًا فقط. يجب رش الأشجار بمبيد فطري نحاسي في فترة السكون (قبل تفتح البراعم في الشتاء). بمجرد ظهور الأعراض على الأوراق، لا يفيد الرش لهذا الموسم.' },
    { id: 'dis5', name: 'الذبول الفيوزاريومي', description: 'مرض فطري يصيب جذور النباتات وينتقل عبر الأوعية الخشبية، مما يسبب انسدادها. يؤدي إلى اصفرار الأوراق على جانب واحد من النبات، وذبولها، وفي النها-ية موت النبات. شائع جدًا في الطماطم والموز والبطيخ.', treatment: 'لا يوجد علاج كيميائي فعال بعد الإصابة. الوقاية هي الحل الأفضل: زراعة أصناف مقاومة، تعقيم التربة بالطاقة الشمسية (التشميس)، وتجنب زراعة نفس المحصول في نفس المكان لعدة سنوات (الدورة الزراعية). يجب إزالة النباتات المصابة وحرقها فورًا.' },
    { id: 'dis6', name: 'البياض الزغبي', description: 'يختلف عن البياض الدقيقي. يظهر على شكل بقع صفراء على السطح العلوي للأوراق، ويقابلها نمو زغبي رمادي أو بنفسجي على السطح السفلي. يزدهر في الطقس البارد والرطب. يصيب العنب والخيار والقرعيات.', treatment: 'تحسين التهوية وتقليل رطوبة الأوراق عن طريق الري في الصباح. استخدام مبيدات فطرية وقائية تحتوي على مركبات النحاس أو المانكوزيب. إزالة الأوراق المصابة لتقليل انتشار المرض.' },
    { id: 'dis7', name: 'عفن الجذور', description: 'مجموعة من الأمراض الفطرية التي تهاجم جذور النباتات، خاصة في التربة سيئة التصريف أو المروية بشكل مفرط. يؤدي إلى تحلل الجذور وتحولها للون البني أو الأسود، مما يسبب ذبول النبات واصفراره وموته.', treatment: 'العلاج صعب. الوقاية هي الأساس: تحسين تصريف التربة بإضافة مواد عضوية أو رمل. تجنب الري الزائد وترك التربة تجف قليلاً بين الريات. في الحالات المبكرة، يمكن إنقاذ النبات بتقليل الري واستخدام مبيد فطري مخصص للجذور.' },
    { id: 'dis8', name: 'فيروس تبرقش الأوراق (TMV)', description: 'مرض فيروسي يصيب مئات الأنواع من النباتات، أشهرها الطماطم والفلفل والتبغ. يسبب ظهور بقع صفراء وخضراء (موزاييك) على الأوراق، مع تشوهها وتقزم النبات. ينتقل بسهولة باللمس والأدوات الزراعية.', treatment: 'لا يوجد علاج للفيروسات. يجب إزالة النباتات المصابة وحرقها فورًا لمنع الانتشار. تعقيم الأدوات الزراعية بالكحول أو الكلور. غسل اليدين جيدًا قبل التعامل مع النباتات، خاصة إذا كان المزارع مدخنًا (الفيروس يمكن أن يبقى في التبغ المعالج).' },
];

// --- ORDERS ---
export const mockOrders: Order[] = [
    { id: 'o1', productId: 'p1', farmerId: 'user1', quantity: 2, status: 'pending' },
    { id: 'o2', productId: 'p3', farmerId: 'user1', quantity: 1, status: 'pending' },
];

// --- NOTIFICATIONS ---
const getCurrentMonthName = (lang: 'ar' | 'en' = 'ar'): string => {
    const monthIndex = new Date().getMonth();
    const arMonths = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    const enMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return lang === 'ar' ? arMonths[monthIndex] : enMonths[monthIndex];
};

const getMonthlyFarmerNotifications = (): Notification[] => {
    const month = new Date().getMonth();
    const notifications: Notification[] = [];
    const now = new Date().toISOString();

    switch(month) {
        case 4: // May
             notifications.push({
                id: 'monthly_tip_may',
                role: UserRole.FARMER,
                type: 'info',
                title: `زراعة شهر ${getCurrentMonthName()}`,
                message: 'الوقت مثالي لزراعة الذرة الشامية والبطيخ. تأكد من تجهيز التربة جيداً.',
                isRead: false,
                createdAt: now,
            });
            notifications.push({
                id: 'monthly_alert_may',
                role: UserRole.FARMER,
                type: 'alert',
                title: 'تحذير من حشرة المن',
                message: 'مع ارتفاع درجات الحرارة، يزداد نشاط حشرة المن. قم بفحص نباتاتك بانتظام.',
                isRead: true,
                createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
            });
            break;
        case 5: // June
             notifications.push({
                id: 'monthly_tip_june',
                role: UserRole.FARMER,
                type: 'info',
                title: `حصاد شهر ${getCurrentMonthName()}`,
                message: 'بدء موسم حصاد بعض أنواع الخضروات الصيفية. احرص على الحصاد في الصباح الباكر.',
                isRead: false,
                createdAt: now,
            });
            break;
        default:
             notifications.push({
                id: 'monthly_tip_default',
                role: UserRole.FARMER,
                type: 'info',
                title: 'نصيحة عامة',
                message: 'تأكد من انتظام الري وتجنب الإفراط في استخدام المياه للحفاظ على صحة الجذور.',
                isRead: false,
                createdAt: now,
            });
    }
    return notifications;
}

export const mockNotifications: Notification[] = [
    ...getMonthlyFarmerNotifications(),
    {
        id: 'order_notif_1',
        userId: 'user2',
        type: 'order',
        title: 'لديك طلب جديد!',
        message: 'قام المزارع صالح الأحمدي بطلب منتج "مبيد فطري عضوي" بكمية 2.',
        isRead: false,
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
];
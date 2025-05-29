# نشر حاسبة الذهب على GitHub Pages مع دفع Stripe

## خطوات الإعداد

### 1. إعداد Stripe
1. قم بإنشاء حساب على [Stripe](https://stripe.com)
2. من لوحة التحكم، احصل على:
   - مفتاح API العام (Publishable Key)
3. أنشئ منتج وسعر:
   - انتقل إلى Products > Add Product
   - اضبط السعر على 9.99 درهم إماراتي
   - احفظ معرف السعر (Price ID)
4. قم بتحديث الملفات التالية بمعلومات Stripe:
   - في `index.html`:
     - استبدل `YOUR_PUBLISHABLE_KEY` بمفتاح API العام
     - استبدل `PRICE_ID` بمعرف السعر

### 2. نشر التطبيق على GitHub Pages

1. إنشاء مستودع GitHub جديد:
   - افتح [GitHub](https://github.com)
   - انقر على "New repository"
   - سمِّ المستودع "gold-calculator"
   - اجعله عاماً
   - انقر "Create repository"

2. رفع الكود إلى GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/gold-calculator.git
git push -u origin main
```

3. تفعيل GitHub Pages:
   - انتقل إلى إعدادات المستودع
   - اختر "Pages" من القائمة
   - في "Source"، اختر "main" branch
   - انقر "Save"
   - انتظر بضع دقائق حتى يتم نشر الموقع

### 3. اختبار الدفع

1. اختبر الدفع في وضع الاختبار:
   - استخدم بطاقة اختبار Stripe: 4242 4242 4242 4242
   - تاريخ انتهاء مستقبلي
   - أي رقم CVC

2. تحقق من:
   - نجاح عملية الدفع
   - التوجيه إلى صفحة النجاح
   - عمل التطبيق بعد الدفع

### 4. الإطلاق للإنتاج

1. قم بتحديث مفتاح Stripe إلى مفتاح الإنتاج
2. اختبر مع بطاقة حقيقية
3. تأكد من عمل التوجيه بعد الدفع

## ملاحظات مهمة

1. الأمان:
   - لا تقم أبداً برفع مفاتيح API السرية إلى GitHub
   - استخدم HTTPS دائماً للدفع

2. متطلبات Stripe:
   - سياسة خصوصية
   - شروط استخدام
   - معلومات الاتصال للدعم

3. المتابعة:
   - راقب المدفوعات في لوحة تحكم Stripe
   - احتفظ بسجلات المعاملات

## روابط مفيدة

- [وثائق Stripe](https://stripe.com/docs)
- [وثائق GitHub Pages](https://docs.github.com/pages)
- [بطاقات اختبار Stripe](https://stripe.com/docs/testing)

## الدعم الفني
إذا واجهت أي مشاكل:
- راجع سجلات Stripe للمدفوعات
- تحقق من صحة مفاتيح API
- تأكد من إعدادات CORS في Stripe

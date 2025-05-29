# إعداد حاسبة الذهب مع نظام الدفع PayPal

## المتطلبات الأساسية
1. حساب على GitHub
2. حساب PayPal للتجار (PayPal Business)

## خطوات الإعداد

### 1. إعداد PayPal
1. قم بإنشاء حساب PayPal Business على [PayPal](https://www.paypal.com/ae/business)
2. من لوحة التحكم:
   - انتقل إلى Developer Dashboard
   - احصل على Client ID
   - تأكد من تفعيل قبول البطاقات بدون حساب PayPal

### 2. تحديث التطبيق
1. في ملف `index.html`:
   - استبدل `YOUR_PAYPAL_CLIENT_ID` بمعرف العميل الخاص بك
   ```javascript
   <script src="https://www.paypal.com/sdk/js?client-id=YOUR_ACTUAL_CLIENT_ID&currency=AED"></script>
   ```

### 3. نشر التطبيق على GitHub Pages

1. في مستودع GitHub الخاص بك:
   - انتقل إلى Settings
   - اختر Pages من القائمة الجانبية
   - في قسم Source، اختر Branch: main
   - انقر Save
   - انتظر بضع دقائق حتى يتم نشر موقعك

2. الموقع سيكون متاحاً على:
   `https://MariamThink.github.io/Gold-calculator-app`

### 4. اختبار الدفع

1. اختبر الدفع بالبطاقة:
   - استخدم بطاقة اختبار PayPal
   - تأكد من ظهور خيار "الدفع بالبطاقة"
   - تحقق من نجاح عملية الدفع
   - تأكد من ظهور رسالة النجاح

2. تحقق من:
   - عمل الحاسبة بعد الدفع
   - إخفاء قسم الدفع بعد نجاح العملية
   - عرض اسم المستخدم في رسالة النجاح

## ملاحظات مهمة

1. الأمان:
   - تأكد من استخدام HTTPS
   - لا تخزن معلومات البطاقات
   - استخدم فقط واجهة PayPal الرسمية

2. متطلبات PayPal:
   - سياسة استرجاع المدفوعات
   - معلومات الاتصال للدعم
   - شروط الاستخدام

3. المتابعة:
   - راقب المدفوعات في لوحة تحكم PayPal
   - تتبع المشاكل والأخطاء
   - قدم الدعم للمستخدمين

## روابط مفيدة
- [وثائق PayPal](https://developer.paypal.com/docs)
- [وثائق GitHub Pages](https://docs.github.com/pages)
- [مركز مساعدة PayPal](https://www.paypal.com/ae/smarthelp/home)

## الدعم الفني
إذا واجهت أي مشاكل:
- راجع سجلات PayPal للمدفوعات
- تحقق من إعدادات الدفع
- تأكد من تفعيل قبول البطاقات

# خطوات نشر التطبيق وإضافة نظام الدفع

## أولاً: نشر التطبيق على Netlify (مجاناً)

1. قم بإنشاء حساب على [Netlify](https://www.netlify.com)
2. ارفع مجلد التطبيق عن طريق السحب والإفلات في لوحة التحكم
3. سيتم إنشاء رابط للتطبيق تلقائياً (مثال: https://gold-calculator.netlify.app)
4. يمكنك ربط نطاق خاص بك لاحقاً

## ثانياً: إضافة نظام الدفع عبر Stripe

1. قم بإنشاء حساب على [Stripe](https://stripe.com)
2. أضف المعلومات البنكية لاستلام المدفوعات
3. قم بإضافة الكود التالي في ملف جديد `payment.js`:

```javascript
// إعداد Stripe
const stripe = Stripe('your_publishable_key');

// إنشاء صفحة الدفع
async function createCheckoutSession() {
    const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            price: 'price_H5ggYwtDq123456' // معرف المنتج في Stripe
        })
    });
    
    const session = await response.json();
    
    // توجيه المستخدم إلى صفحة الدفع
    const result = await stripe.redirectToCheckout({
        sessionId: session.id
    });
}
```

4. أضف زر الدفع في `index.html`:

```html
<button onclick="createCheckoutSession()">شراء التطبيق</button>
<div id="payment-message"></div>

<!-- إضافة مكتبة Stripe -->
<script src="https://js.stripe.com/v3/"></script>
<script src="payment.js"></script>
```

## الخطوات التالية

1. إعداد خادم بسيط (يمكن استخدام Netlify Functions):
   - للتعامل مع طلبات الدفع
   - تخزين معلومات المستخدمين
   - التحقق من المدفوعات

2. إضافة Apple Pay:
   - تفعيل Apple Pay في لوحة تحكم Stripe
   - إضافة شهادات Apple Pay
   - تحديث كود الدفع ليدعم Apple Pay

3. حماية التطبيق:
   - إضافة نظام تسجيل دخول
   - التحقق من الدفع قبل السماح بالوصول
   - تخزين معلومات المستخدمين بشكل آمن

## ملاحظات مهمة

- تأكد من اتباع سياسة Apple للمدفوعات
- قم بتوفير سياسة خصوصية وشروط استخدام
- وفر دعم للعملاء عبر البريد الإلكتروني
- احتفظ بسجلات المعاملات للضرائب

## الدعم الفني

للمساعدة في إعداد نظام الدفع:
- Stripe: https://stripe.com/docs
- Apple Pay: https://developer.apple.com/apple-pay/
- Netlify: https://docs.netlify.com

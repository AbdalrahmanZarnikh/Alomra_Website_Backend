// routes/contacts.js
const { generateVCard } = require('../utils/vCardGenerator');
const User = require("../models/userModel")
// جلب جميع المستخدمين كملف vCard
router.get('/export/vcf', auth, async (req, res) => {
  try {
    const users = await User.find({}, 'name phone ');
    
    let vCards = '';
    users.forEach(user => {
      vCards += generateVCard(user) + '\n';
    });

    res.setHeader('Content-Type', 'text/vcard');
    res.setHeader('Content-Disposition', 'attachment; filename="app_contacts.vcf"');
    res.send(vCards);

  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

// جلب مستخدم معين كملف vCard
router.get('/export/vcf/:userId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'المستخدم غير موجود' });
    }

    const vCard = generateVCard(user);

    res.setHeader('Content-Type', 'text/vcard');
    res.setHeader('Content-Disposition', `attachment; filename="${user.name}.vcf"`);
    res.send(vCard);

  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});
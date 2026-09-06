# إلكترونية

مدونة شخصية تقنية ومعرض مشاريع، مبنية بـ [Astro](https://astro.build) ومستضافة على GitHub Pages.

## التشغيل محليًا

```bash
npm install
npm run dev
```

الموقع سيعمل على `http://localhost:4321`.

## إضافة تدوينة جديدة

أنشئ ملف `.md` جديد داخل `src/content/blog/`:

```markdown
---
title: "عنوان التدوينة"
description: "وصف قصير يظهر في القائمة."
pubDate: 2026-09-10
tags: ["bsd", "شبكات"]
---

محتوى التدوينة هنا بصيغة Markdown عادية.
```

## إضافة مشروع جديد

أنشئ ملف `.md` جديد داخل `src/content/projects/`:

```markdown
---
title: "اسم المشروع"
summary: "وصف سطر أو سطرين."
stack: ["Kotlin", "Room"]
status: "active"   # active | done | planned
repoUrl: "https://github.com/iabojo/repo-name"
releaseUrl: "https://github.com/iabojo/repo-name/releases/latest"
order: 2
---

تفاصيل إضافية عن المشروع هنا.
```

## النشر

كل push إلى فرع `main` يُشغّل GitHub Actions تلقائيًا (`.github/workflows/deploy.yml`) لبناء الموقع ونشره.

**خطوة لمرة واحدة فقط بعد أول push:** من إعدادات الريبو على GitHub:
`Settings → Pages → Build and deployment → Source` اختر **GitHub Actions** (وليس "Deploy from a branch").

## البنية

```
src/
├── content/
│   ├── blog/       # التدوينات (Markdown)
│   └── projects/   # المشاريع (Markdown)
├── components/     # مكوّنات Astro القابلة لإعادة الاستخدام
├── layouts/         # القالب الأساسي (RTL + SEO + الخطوط)
├── pages/          # المسارات الفعلية للموقع
└── styles/         # نظام التصميم (الألوان، الخطوط، المكوّنات)
```

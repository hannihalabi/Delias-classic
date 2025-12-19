Här är en state-of-the-art, steg-för-steg-guide för statisk blogg (HTML) på GitHub Pages där auto-posting = en automation som committar nya artikel-filer till repo:t → Pages deployar automatiskt.

⸻

Målbild (arkitektur)

Källa (Blaze / formulär / Google Doc / vad som helst) → n8n/Zapier → GitHub commit (nya filer + uppdaterad index/JSON/sitemap) → GitHub Pages publicerar.
Ingen egen server behövs.

⸻

Steg 1: Sätt upp GitHub Pages “deploy from branch”
	1.	Lägg din statiska site i ett repo (t.ex. branch main, folder / eller /docs).
	2.	Gå till Repo → Settings → Pages
	3.	Under Build and deployment välj Deploy from a branch och välj din branch + folder.  ￼
	4.	Verifiera att sidan byggs när du pushar.

Detta är enklast om du publicerar “färdiga” HTML-filer och inte behöver en build-process.

⸻

Steg 2: Bestäm filstruktur för blogginlägg (rekommenderad)

Skapa en tydlig struktur så URL:er blir snygga och stabila:
	•	blog/
	•	posts.json  ← lista över inlägg (automation uppdaterar)
	•	index.html  ← bloggsida som renderar listan
	•	my-first-post/
	•	index.html
	•	another-post/
	•	index.html

Varför detta upplägg?
	•	.../blog/slug/ är SEO-vänligt
	•	du slipper uppdatera menyer manuellt: automation uppdaterar posts.json


Steg 3: Bygg “blogg-listan” (frontend) en gång

3A) blog/posts.json (format)

Exempel: 
[
  {
    "title": "Min första post",
    "slug": "my-first-post",
    "date": "2025-12-16",
    "excerpt": "Kort intro…"
  }
]

3B) blog/index.html (rendera automatiskt)

Minimal JS som funkar på GitHub Pages:
<div id="posts"></div>
<script>
(async () => {
  const res = await fetch("./posts.json", { cache: "no-store" });
  const posts = await res.json();
  posts.sort((a,b) => b.date.localeCompare(a.date));

  document.getElementById("posts").innerHTML = posts.map(p => `
    <article>
      <h2><a href="./${p.slug}/">${p.title}</a></h2>
      <small>${p.date}</small>
      <p>${p.excerpt ?? ""}</p>
    </article>
  `).join("");
})();
</script>

Steg 4: Automationen (n8n) som “auto-publicerar”

Du kan göra samma med Zapier, men n8n är ofta mer flexibelt.

4A) Skapa GitHub-token (minsta behörighet)
	•	Skapa en fine-grained Personal Access Token som bara har access till det repo:t och rätt repo-permissions.  ￼
	•	Lägg token som credential/secret i n8n (aldrig i frontend-JS).

4B) n8n-workflow: noder (standard)
	1.	Webhook Trigger (Production URL) och aktivera workflow så att “prod-webhooken” fungerar.  ￼
	2.	Set / Function: bygg slug, date, excerpt, och HTML-sträng.
	3.	HTTP Request → GitHub: skapa fil blog/{slug}/index.html via GitHubs “contents” API.  ￼
	4.	HTTP Request → GitHub: uppdatera blog/posts.json (lägg till posten överst).

4C) Viktiga GitHub-API-detaljer (så det faktiskt funkar)
	•	GitHub “Create or update file contents” kräver att content skickas Base64-enkodat.  ￼
	•	Om du uppdaterar en befintlig fil (t.ex. posts.json) behöver du först hämta filens metadata och använda dess sha i PUT-anropet.  ￼

API-flöde för posts.json:
	1.	GET /repos/{owner}/{repo}/contents/blog/posts.json → få sha + nuvarande base64-content  ￼
	2.	Dekoda → lägg till ny post → enkoda →
	3.	PUT /repos/{owner}/{repo}/contents/blog/posts.json med sha

⸻

Steg 5: “Publicera” från Blaze utan backend

Du har två vanliga sätt:

A) Manuell “Publish” → n8n webhook
	•	Kopiera artikelns HTML/Markdown från Blaze → skicka via ett enkelt formulär (t.ex. en privat admin-sida) till n8n webhook.
	•	n8n skapar filerna + uppdaterar posts.json.

B) Blaze → n8n direkt (om du kan trigga webhook)
	•	Om Blaze kan skicka data/webhook eller via integration (t.ex. Zapier → webhook) så pekar du den mot n8n Webhook Trigger.

⸻

Steg 6: Auto-deploy är redan löst

Så fort n8n committar till rätt branch/folder, GitHub Pages deployar enligt din Pages-inställning (Deploy from branch).  ￼

⸻

Steg 7: (Valfritt men proffsigt) Custom domain + HTTPS
	1.	GitHub: Settings → Pages → Custom domain.  ￼
	2.	DNS hos one.com:

	•	Apex: A-records till 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153  ￼

	3.	Slå på Enforce HTTPS i Pages.  ￼

⸻

Checklista (så du vet att du är klar)
	•	blog/index.html renderar från blog/posts.json
	•	n8n webhook tar emot {title, slug, html, excerpt, date}
	•	n8n skapar blog/slug/index.html
	•	n8n uppdaterar blog/posts.json (GET sha → PUT med sha)
	•	När du triggar n8n: commit syns i GitHub → inlägg syns live
# AGENT.md

GitHub Pages hosting and DNS for this project. Stack, build, and content
are TBD and not covered here.

- **Repo:** `Spudworx/GoldenOrbAtelier` — **private**, in the **Spudworx**
  GitHub organization. Private GitHub Pages works because Spudworx is on
  the paid **GitHub Team** plan (a free org can only serve Pages from
  public repos).
- **Hosting:** GitHub Pages, custom domain **`goldenorbatelier.com`**
  (set in Settings → Pages / the `CNAME` file). Enable **Enforce HTTPS**
  once the domain validates.

**DNS at Namecheap** — Advanced DNS → Host Records (delete Namecheap's
two default parking records first):

| Type  | Host  | Value                |
| ----- | ----- | -------------------- |
| A     | `@`   | `185.199.108.153`    |
| A     | `@`   | `185.199.109.153`    |
| A     | `@`   | `185.199.110.153`    |
| A     | `@`   | `185.199.111.153`    |
| CNAME | `www` | `spudworx.github.io` |

Nameservers must be **Namecheap BasicDNS**. The `www` CNAME points at the
org (`spudworx.github.io`), not the repo.

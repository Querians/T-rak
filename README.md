## Getting Started

This project is create by using [pnpm](https://pnpm.io/) with [next.js](https://nextjs.org/docs/getting-started/installation) framework.

First, install dependencies:
```bash
pnpm install
```

Second, run the development server:

```bash
pnpm dev --turbo
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## API docs

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px; font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
</style>
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky">route</th>
    <th class="tg-0pky">method</th>
    <th class="tg-0pky">request</th>
    <th class="tg-0pky">response (success)</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">/api/auth/signin</td>
    <td class="tg-0pky">POST</td>
    <td class="tg-0pky">{ <br>&nbsp;&nbsp;email: string,<br>&nbsp;&nbsp;password: string<br>}</td>
    <td class="tg-0pky">{   status: 301 }</td>
  </tr>
  <tr>
    <td class="tg-0pky">/api/auth/signup</td>
    <td class="tg-0pky">POST</td>
    <td class="tg-0pky">{<br>&nbsp;&nbsp;email: string, <br>&nbsp;&nbsp;password: string, <br>&nbsp;&nbsp;picture: FILE, <br>&nbsp;&nbsp;name: string<br>}</td>
    <td class="tg-0pky">{   status: 301  }</td>
  </tr>
  <tr>
    <td class="tg-0pky">/api/auth/signout</td>
    <td class="tg-0pky">POST</td>
    <td class="tg-0pky"></td>
    <td class="tg-0pky">{   status: 301 }</td>
  </tr>
  <tr>
    <td class="tg-0pky">/api/user (get personal info)</td>
    <td class="tg-0pky">GET</td>
    <td class="tg-0pky">{ <br>&nbsp;&nbsp;userId: string<br>}</td>
    <td class="tg-0pky">{   email: string,   picture: string (path),   name: string }</td>
  </tr>
  <tr>
    <td class="tg-0pky">/api/user (update)</td>
    <td class="tg-0pky">POST</td>
    <td class="tg-0pky">{<br>&nbsp;&nbsp;userId: string,<br>&nbsp;&nbsp;picture: string,<br>&nbsp;&nbsp;name: string <br>}</td>
    <td class="tg-0pky">{   status: 200 }</td>
  </tr>
  <tr>
    <td class="tg-0pky">/api/tierlist/create</td>
    <td class="tg-0pky">POST</td>
    <td class="tg-0pky">{<br>&nbsp;&nbsp;categoryId: string,<br>&nbsp;&nbsp;userId: string,<br>&nbsp;&nbsp;name: string,<br>&nbsp;&nbsp;descrirption: string,<br>&nbsp;&nbsp;coverPhoto: FILE<br>}</td>
    <td class="tg-0pky">{ status: 200 }</td>
  </tr>
  <tr>
    <td class="tg-0pky">/api/tierlist/update</td>
    <td class="tg-0pky">POST</td>
    <td class="tg-0pky">{ <br>&nbsp;&nbsp;tierlistId: string,<br>&nbsp;&nbsp;categoryId: string,<br>&nbsp;&nbsp;name: string,<br>&nbsp;&nbsp;descrirption: string,<br>&nbsp;&nbsp;coverPhoto: FILE<br>}</td>
    <td class="tg-0pky">{status: 200}</td>
  </tr>
  <tr>
    <td class="tg-0pky">/api/tierlist (home)</td>
    <td class="tg-0pky">GET</td>
    <td class="tg-0pky">{ <br>&nbsp;&nbsp;userId: string<br>}</td>
    <td class="tg-0pky">{<br>&nbsp;&nbsp;Array(<br>&nbsp;&nbsp;&nbsp;&nbsp;tierlistId: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;categoryName: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;name: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;coverPhotoUrl: string<br>&nbsp;&nbsp;)<br>}</td>
  </tr>
  <tr>
    <td class="tg-0pky">/api/tierlist/:tierlistId</td>
    <td class="tg-0pky">GET</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">{<br>&nbsp;&nbsp;tierlistId: string, <br>&nbsp;&nbsp;categoryName: string,<br>&nbsp;&nbsp;name: string,<br>&nbsp;&nbsp;coverPhotoUrl: string,<br>&nbsp;&nbsp;descrirption: string,<br>&nbsp;&nbsp;rows: Array({ <br>&nbsp;&nbsp;&nbsp;&nbsp;rowId: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;label: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;color: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;order: number,<br>&nbsp;&nbsp;&nbsp;&nbsp;elements: Array({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;elementId: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rowId: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pictureUrl: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;})<br>}</td>
  </tr>
  <tr>
    <td class="tg-0pky">/api/tierlist/row</td>
    <td class="tg-0pky">POST</td>
    <td class="tg-0pky"></td>
    <td class="tg-0pky">{<br><br>}</td>
  </tr>
  <tr>
    <td class="tg-0pky">/api/tierlist/row/:rowId</td>
    <td class="tg-0pky">GET</td>
    <td class="tg-0pky"></td>
    <td class="tg-0pky"></td>
  </tr>
</tbody>
</table>

(generate table from : https://www.tablesgenerator.com/html_tables)

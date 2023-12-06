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

<table>
<thead>
  <tr>
    <th>route</th>
    <th>method</th>
    <th>request</th>
    <th>response (success)</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>/api/auth/signin</td>
    <td>POST</td>
    <td>{ <br>&nbsp;&nbsp;email: string,<br>&nbsp;&nbsp;password: string<br>}</td>
    <td>{   status: 301 }</td>
  </tr>
  <tr>
    <td>/api/auth/signup</td>
    <td>POST</td>
    <td>{<br>&nbsp;&nbsp;email: string, <br>&nbsp;&nbsp;password: string, <br>&nbsp;&nbsp;picture: FILE, <br>&nbsp;&nbsp;name: string<br>}</td>
    <td>{   status: 301  }</td>
  </tr>
  <tr>
    <td>/api/auth/signout</td>
    <td>POST</td>
    <td>-</td>
    <td>{   status: 301 }</td>
  </tr>
  <tr>
    <td>/api/user (get personal info)</td>
    <td>GET</td>
    <td>-</td>
    <td>{   email: string,   picture: string (path),   name: string }</td>
  </tr>
  <tr>
    <td>/api/user (update)</td>
    <td>POST</td>
    <td>{<br>  picture: string,<br>  name: string <br>}</td>
    <td>{   status: 200 }</td>
  </tr>
  <tr>
    <td>/api/tierlist/create</td>
    <td>POST</td>
    <td>{<br>  categoryId: string,<br>  name: string,<br>  descrirption: string,<br>  coverPhoto: FILE,<br>  rowCount: number<br>}</td>
    <td>{ status: 200 }</td>
  </tr>
  <tr>
    <td>/api/tierlist/update</td>
    <td>POST</td>
    <td>{ <br>  tierlistId: string,<br>  categoryName?: string,<br>  name?: string,<br>  descrirption?: string,<br>  coverPhoto?: FILE<br>}</td>
    <td>{status: 200}</td>
  </tr>
  <tr>
    <td>/api/tierlist (home)</td>
    <td>GET</td>
    <td>-</td>
    <td>{<br>&nbsp;&nbsp;Array(<br>&nbsp;&nbsp;&nbsp;&nbsp;tierlistId: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;categoryName: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;name: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;coverPhotoUrl: string<br>&nbsp;&nbsp;)<br>}</td>
  </tr>
  <tr>
    <td>/api/tierlist/:tierlistId</td>
    <td>GET</td>
    <td>-</td>
    <td>{<br>&nbsp;&nbsp;tierlistId: string, <br>&nbsp;&nbsp;categoryName: string,<br>&nbsp;&nbsp;name: string,<br>&nbsp;&nbsp;coverPhotoUrl: string,<br>&nbsp;&nbsp;descrirption: string,<br>&nbsp;&nbsp;rows: Array({ <br>&nbsp;&nbsp;&nbsp;&nbsp;rowId: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;label: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;color: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;order: number,<br>&nbsp;&nbsp;&nbsp;&nbsp;elements: Array({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;elementId: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rowId: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pictureUrl: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;})<br>}</td>
  </tr>
  <tr>
    <td>/api/tierlist/row</td>
    <td>POST</td>
    <td></td>
    <td>{<br><br>}</td>
  </tr>
  <tr>
    <td>/api/tierlist/row/:rowId</td>
    <td>GET</td>
    <td></td>
    <td></td>
  </tr>
</tbody>
</table>
(generate table from : https://www.tablesgenerator.com/html_tables)

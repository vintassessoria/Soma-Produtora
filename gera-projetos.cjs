/* Gera uma pagina por projeto a partir dos mesmos dados da galeria.
   Um arquivo por projeto — e nao uma pagina unica com ?id= — porque assim
   cada trabalho tem URL, titulo e og:image proprios, o que importa quando
   alguem compartilha o link de um projeto especifico. */
const fs = require('fs');

const P = [
  { id:'expomix', t:'EXPOMIX', c:'2025 · Evento', p:'pj-expomix.webp', vert:false,
    v:'https://pub-dfd14236a91140a5a1e41c79f0a83fe4.r2.dev/aftermovie-1.MP4',
    d:['Aftermovie do encontro que virou ponto de encontro da cidade.',
       'A cobertura acompanhou montagem, público e desmontagem. O corte final privilegia o movimento das pessoas pelo espaço — quem chega, quem come, quem fica até o fim.'],
    f:['Aftermovie','Direção','Pós-produção'] },
  { id:'mari', t:'MARI FERNANDEZ', c:'2024 · Show', p:'pj-mari.webp', vert:false,
    v:'https://pub-dfd14236a91140a5a1e41c79f0a83fe4.r2.dev/mari-fernandez.MP4',
    d:['Palco principal, registro multicâmera e corte no ritmo da plateia.',
       'Posições fixas somadas a uma câmera na pista. A montagem segue a energia do público em vez da ordem do setlist.'],
    f:['Show','Multicâmera','Registro ao vivo'] },
  { id:'bike-after', t:'BORA DE BIKE', c:'2025 · Evento', p:'pj-bike-after.webp', vert:false,
    v:'https://pub-dfd14236a91140a5a1e41c79f0a83fe4.r2.dev/Bora%20de%20Bike%20-%20After%20Movie%20Final%20Maio%20.MOV',
    d:['A cidade vista de cima e de dentro do pelotão, no mesmo filme.',
       'Drone e câmera em movimento alternando ao longo do percurso, para que a escala do evento e a experiência de quem pedala apareçam lado a lado.'],
    f:['Aftermovie','Drone','Câmera em movimento'] },
  { id:'fome', t:'FOME DE MÚSICA', c:'2024 · Campanha', p:'pj-fome.webp', vert:false,
    v:'https://pub-dfd14236a91140a5a1e41c79f0a83fe4.r2.dev/FOME%20DE%20M%C3%9ASICA%20-%20VER%C3%83O%20R2%20_v3.mp4',
    d:['Campanha de verão construída para viver no feed e no telão.',
       'Mesma direção de imagem, dois formatos de entrega: o corte vertical para as redes e a versão em tela cheia para exibição no evento.'],
    f:['Campanha','Branded content','Dois formatos'] },
  { id:'praia', t:'NA PRAIA', c:'2025 · Festival', p:'pj-praia.webp', vert:false,
    v:'https://pub-dfd14236a91140a5a1e41c79f0a83fe4.r2.dev/Acessibilidade%20-%20Tel%C3%A3o%202025%20Na%20Praia.MOV',
    d:['Acessibilidade em telão: o festival inteiro traduzido ao vivo.',
       'Operação de telão com tradução simultânea em Libras durante toda a programação, integrada à régie do festival.'],
    f:['Festival','Telão','Acessibilidade'] },
  { id:'bike-final', t:'BORA DE BIKE — FINAL', c:'2024 · Evento', p:'pj-bike-final.webp', vert:false,
    v:'https://pub-dfd14236a91140a5a1e41c79f0a83fe4.r2.dev/Bora%20de%20Bike%20-%20Final%20.MOV',
    d:['O corte final, fechando a temporada com a chegada em Brasília.',
       'Reúne material das etapas anteriores com a cobertura do dia da chegada, montado como encerramento de uma história que durou a temporada inteira.'],
    f:['Aftermovie','Encerramento de temporada'] },
  { id:'leo', t:'LEO FOGUETE', c:'2026 · Show', p:'pj-leo.webp', vert:false, v:'pj-leo.mp4',
    d:['Do foco no palco ao plano aéreo: a arena cheia em um mesmo corte.',
       'A troca entre o detalhe do artista e a vista geral da arena acontece dentro do mesmo movimento — é o que dá a dimensão do público.'],
    f:['Show','Arena','Drone'] },
  { id:'dia2', t:'FUNN ARENA — DIA 2', c:'2026 · Festival', p:'pj-dia2.webp', vert:false, v:'pj-dia2.mp4',
    d:['Segundo dia de arena: o registro que continua depois que a festa vira rotina.',
       'O segundo dia costuma ficar de fora das coberturas. Aqui ele tem filme próprio, com o que só aparece quando a novidade já passou.'],
    f:['Festival','Registro','Aftermovie'] },
  { id:'zevaqueiro', t:'ZÉ VAQUEIRO', c:'2026 · Campanha', p:'pj-zevaqueiro.webp', vert:true, v:'pj-zevaqueiro.mp4',
    d:['Chamada vertical do Funn Arena, cortada para viver no feed.',
       'Formato 9:16 pensado desde a gravação, e não recortado depois: enquadramento, ritmo e texto na tela feitos para o celular.'],
    f:['Campanha','Vertical 9:16','Redes sociais'] },
];

const esc = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function pagina(pr) {
  const outros = P.filter(o => o.id !== pr.id);
  /* A secao "sobre o projeto" foi removida da pagina. Os textos em pr.d
     continuam em uso na description e no og:description do cabecalho, que
     e o que aparece quando o link e compartilhado. */
  const grade = outros.map(o =>
    '<li><a href="projeto-' + o.id + '.html">' +
    '<img src="' + o.p + '" alt="' + esc(o.t) + '" loading="lazy" decoding="async">' +
    '<b>' + esc(o.t) + '</b></a></li>').join('\n      ');

  return [
'<!doctype html>',
'<html lang="pt-BR">',
'<head>',
'<meta charset="utf-8">',
'<meta name="viewport" content="width=device-width,initial-scale=1">',
'<title>' + esc(pr.t) + ' — SOMA Produtora</title>',
'<meta name="description" content="' + esc(pr.d[0]) + '">',
'<meta property="og:title" content="' + esc(pr.t) + ' — SOMA Produtora">',
'<meta property="og:description" content="' + esc(pr.d[0]) + '">',
'<meta property="og:image" content="https://somacorps.com/' + pr.p + '">',
'<meta property="og:type" content="video.other">',
'<link rel="icon" href="favicon.png">',
'<link rel="preconnect" href="https://fonts.googleapis.com">',
'<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
'<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">',
'<link rel="stylesheet" href="projeto.css">',
'</head>',
'<body>',
'',
'<nav class="pv-nav">',
'  <a href="index.html" aria-label="SOMA Produtora"><img src="logotipo.png" alt="SOMA Produtora" width="1031" height="362"></a>',
'  <a class="pv-volta" href="index.html#projetos">&larr; Todos os projetos</a>',
'</nav>',
'',
'<header class="pv-hero">',
'  <video muted loop playsinline autoplay preload="metadata" poster="' + pr.p + '" aria-hidden="true">',
'    <source src="' + pr.v + '" type="video/mp4">',
'  </video>',
'  <div class="dentro">',
'    <h1>' + esc(pr.t) + '</h1>',
'    <p class="pv-cat">' + esc(pr.c) + '</p>',
'  </div>',
'</header>',
'',
'<main>',
'  <section class="wrap pv-player">',
'    <video controls playsinline preload="metadata" poster="' + pr.p + '"' + (pr.vert ? ' class="vert"' : '') + '>',
'      <source src="' + pr.v + '" type="video/mp4">',
'      Seu navegador não reproduz este vídeo.',
'    </video>',
'  </section>',
'',
'  <section class="wrap pv-outros">',
'    <h2>Outros projetos</h2>',
'    <ul class="pv-grade">',
'      ' + grade,
'    </ul>',
'  </section>',
'</main>',
'',
'<footer class="pv-pe">',
'  <span>© 2026 SOMA Produtora · Brasília</span>',
'  <span>',
'    <a href="index.html">Início</a> &nbsp;·&nbsp;',
'    <a href="tel:+5561985011819">61 98501-1819</a> &nbsp;·&nbsp;',
'    <a href="https://www.instagram.com/soma.produtora/" target="_blank" rel="noopener">Instagram</a>',
'  </span>',
'</footer>',
'',
'</body>',
'</html>',
''].join('\n');
}

let n = 0;
P.forEach(pr => { fs.writeFileSync('projeto-' + pr.id + '.html', pagina(pr)); n++; });
console.log('paginas geradas: ' + n);
P.forEach(pr => console.log('  projeto-' + pr.id + '.html'.padEnd(28) + pr.t));

export default function HeroBg() {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 1360 840"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Base */}
      <rect width="1360" height="840" fill="#FAF7F2" />
      <rect x="0" y="580" width="1360" height="260" fill="#F5F0E8" />
      <ellipse cx="680" cy="600" rx="800" ry="44" fill="#F5F0E8" />

      {/* Ambient blobs */}
      <circle cx="120" cy="100" r="160" fill="#E8DFD0" opacity="0.35" />
      <circle cx="1240" cy="80" r="120" fill="#D4A89A" opacity="0.15" />
      <circle cx="1160" cy="160" r="80" fill="#C47D5A" opacity="0.08" />
      <circle cx="240" cy="760" r="100" fill="#A8B89A" opacity="0.15" />
      <circle cx="1120" cy="740" r="90" fill="#E8DFD0" opacity="0.25" />
      <circle cx="680" cy="60" r="140" fill="#E8DFD0" opacity="0.12" />

      {/* Tiny dot texture */}
      <g opacity="0.05">
        <circle cx="200" cy="240" r="4" fill="#4A5D3A" />
        <circle cx="400" cy="160" r="3" fill="#4A5D3A" />
        <circle cx="640" cy="100" r="4" fill="#C47D5A" />
        <circle cx="960" cy="140" r="3" fill="#4A5D3A" />
        <circle cx="1120" cy="260" r="4" fill="#C47D5A" />
        <circle cx="300" cy="400" r="3" fill="#C47D5A" />
        <circle cx="1060" cy="400" r="4" fill="#4A5D3A" />
        <circle cx="800" cy="200" r="3" fill="#4A5D3A" />
        <circle cx="520" cy="260" r="3" fill="#C47D5A" />
        <circle cx="880" cy="320" r="3" fill="#4A5D3A" />
        <circle cx="160" cy="500" r="3" fill="#4A5D3A" />
        <circle cx="1200" cy="480" r="3" fill="#C47D5A" />
      </g>

      {/* ====== LEFT FOLIAGE ====== */}
      <g>
        <path d="M56 600 Q60 540 76 504 Q92 468 80 432 Q68 396 88 364 Q108 332 92 296 L104 290 Q124 322 108 354 Q88 386 100 422 Q112 458 96 494 Q80 530 76 600Z" fill="#4A5D3A" opacity="0.18" />
        <path d="M20 600 Q28 556 36 528 Q44 500 32 472 Q20 444 40 416 L52 422 Q32 448 44 476 Q56 504 48 532 Q40 560 36 600Z" fill="#6B7F5A" opacity="0.14" />
        <path d="M100 600 Q108 568 96 540 Q84 512 100 484 L112 490 Q96 516 108 544 Q120 572 112 600Z" fill="#A8B89A" opacity="0.12" />
      </g>

      {/* ====== RIGHT FOLIAGE ====== */}
      <g>
        <path d="M1272 600 Q1268 548 1284 520 Q1300 492 1288 464 Q1276 436 1296 408 L1308 414 Q1288 440 1300 468 Q1312 496 1296 524 Q1280 552 1284 600Z" fill="#4A5D3A" opacity="0.16" />
        <path d="M1320 600 Q1312 560 1324 536 Q1336 512 1324 488 L1336 484 Q1348 508 1336 532 Q1324 556 1332 600Z" fill="#6B7F5A" opacity="0.13" />
        <path d="M1240 600 Q1248 576 1236 552 L1248 548 Q1260 572 1252 600Z" fill="#A8B89A" opacity="0.1" />
      </g>

      {/* ====== MATERA GRANDE (izquierda) ====== */}
      <g>
        <rect x="120" y="510" width="136" height="144" rx="12" fill="#BFA98F" />
        <rect x="128" y="518" width="120" height="128" rx="8" fill="#CDBBA5" />
        {/* Planta grande */}
        <path d="M188 510 Q180 476 166 462 Q148 440 156 416 Q164 392 152 368 L164 364 Q176 388 168 412 Q160 436 176 458 Q192 480 196 510Z" fill="#4A5D3A" opacity="0.55" />
        <path d="M188 510 Q196 480 212 466 Q228 452 220 428 L232 424 Q240 448 224 462 Q208 476 200 510Z" fill="#6B7F5A" opacity="0.45" />
        <path d="M188 510 Q176 490 160 484 Q144 478 136 458 L148 454 Q156 474 172 480 Q188 486 196 510Z" fill="#3D7A4A" opacity="0.35" />
        <ellipse cx="188" cy="514" rx="44" ry="10" fill="#5C7A4A" opacity="0.2" />
        <circle cx="172" cy="470" r="5" fill="#A8B89A" opacity="0.25" />
        <circle cx="216" cy="444" r="4" fill="#A8B89A" opacity="0.2" />
      </g>

      {/* ====== MATERA CILINDRICA ====== */}
      <g>
        <path d="M340 610 L340 534 Q340 510 364 510 L396 510 Q420 510 420 534 L420 610Z" fill="#C47D5A" opacity="0.6" />
        <rect x="330" y="502" width="100" height="18" rx="5" fill="#A8633F" opacity="0.5" />
        <ellipse cx="380" cy="506" rx="42" ry="8" fill="#D4A89A" opacity="0.2" />
        <path d="M372 502 Q366 480 374 460 Q382 440 374 420 L384 416 Q392 436 384 456 Q376 476 380 502Z" fill="#4A5D3A" opacity="0.45" />
        <path d="M388 502 Q396 482 408 470 L416 476 Q404 488 396 502Z" fill="#6B7F5A" opacity="0.35" />
        <path d="M368 502 Q358 486 346 480 L354 474 Q366 480 374 502Z" fill="#3D7A4A" opacity="0.3" />
      </g>

      {/* ====== MATERA CUADRADA BAJA (centro-izquierda) ====== */}
      <g>
        <rect x="520" y="550" width="96" height="100" rx="8" fill="#8C8278" opacity="0.45" />
        <rect x="528" y="558" width="80" height="84" rx="6" fill="#9E938A" opacity="0.45" />
        <rect x="528" y="558" width="80" height="26" rx="6" fill="#E8DFD0" opacity="0.15" />
        <path d="M564 550 Q560 534 568 520 L576 524 Q568 538 572 550Z" fill="#4A5D3A" opacity="0.4" />
        <path d="M580 550 Q588 536 596 528 L602 533 Q592 541 586 550Z" fill="#6B7F5A" opacity="0.3" />
        <ellipse cx="572" cy="554" rx="26" ry="6" fill="#5C7A4A" opacity="0.15" />
      </g>

      {/* ====== VELA GRANDE ====== */}
      <g>
        <ellipse cx="780" cy="614" rx="48" ry="10" fill="#E8DFD0" opacity="0.4" />
        <rect x="750" y="514" width="60" height="104" rx="16" fill="#D4A89A" opacity="0.5" />
        <rect x="756" y="520" width="48" height="92" rx="12" fill="#E2C4B6" opacity="0.5" />
        {/* Detalle cera */}
        <path d="M776 520 Q772 504 778 492 Q784 480 780 466 L786 464 Q790 478 784 490 Q778 502 782 520Z" fill="#F5F0E8" opacity="0.2" />
        {/* Mecha y llama */}
        <rect x="777" y="500" width="6" height="22" rx="3" fill="#FFDC8E" opacity="0.55" />
        <ellipse cx="780" cy="500" rx="14" ry="7" fill="#FFB347" opacity="0.12" />
        <line x1="780" y1="500" x2="780" y2="488" stroke="#FFDC8E" stroke-width="1.2" opacity="0.4" />
        <circle cx="780" cy="486" r="4" fill="#FFB347" opacity="0.2" />
        <circle cx="780" cy="482" r="2.5" fill="#FF9F1C" opacity="0.12" />
        {/* Lunares decorativos */}
        <circle cx="768" cy="560" r="4" fill="#C9A898" opacity="0.18" />
        <circle cx="788" cy="576" r="3" fill="#C9A898" opacity="0.13" />
        <circle cx="772" cy="590" r="2.5" fill="#C9A898" opacity="0.1" />
      </g>

      {/* ====== VELA PEQUEÑA ====== */}
      <g>
        <ellipse cx="920" cy="618" rx="34" ry="7" fill="#E8DFD0" opacity="0.35" />
        <rect x="898" y="554" width="44" height="68" rx="12" fill="#E8DFD0" opacity="0.45" />
        <rect x="904" y="560" width="32" height="56" rx="9" fill="#F0E6D8" opacity="0.45" />
        <rect x="917" y="542" width="5" height="16" rx="2.5" fill="#FFDC8E" opacity="0.45" />
        <line x1="919.5" y1="542" x2="919.5" y2="534" stroke="#FFDC8E" stroke-width="0.8" opacity="0.3" />
        <circle cx="919.5" cy="532" r="3" fill="#FFB347" opacity="0.15" />
        <circle cx="912" cy="582" r="2.5" fill="#DDD2C4" opacity="0.2" />
      </g>

      {/* ====== MINI MATERA (derecha) ====== */}
      <g>
        <ellipse cx="1080" cy="620" rx="36" ry="7" fill="#E8DFD0" opacity="0.35" />
        <rect x="1054" y="564" width="52" height="60" rx="7" fill="#9E938A" opacity="0.35" />
        <rect x="1060" y="570" width="40" height="48" rx="5" fill="#B5A99C" opacity="0.35" />
        <path d="M1080 564 Q1076 550 1082 538 L1090 542 Q1084 554 1088 564Z" fill="#4A5D3A" opacity="0.3" />
        <path d="M1070 564 Q1062 546 1070 534 L1078 538 Q1070 550 1078 564Z" fill="#6B7F5A" opacity="0.25" />
        <ellipse cx="1080" cy="568" rx="14" ry="3.5" fill="#5C7A4A" opacity="0.12" />
      </g>

      {/* Decorative floor line */}
      <line x1="0" y1="660" x2="1360" y2="660" stroke="#E8DFD0" stroke-width="0.8" opacity="0.5" />

      {/* Subtle floor lines */}
      <g opacity="0.03">
        <line x1="0" y1="690" x2="1360" y2="690" stroke="#8C8278" stroke-width="0.5" />
        <line x1="0" y1="720" x2="1360" y2="720" stroke="#8C8278" stroke-width="0.5" />
        <line x1="0" y1="750" x2="1360" y2="750" stroke="#8C8278" stroke-width="0.5" />
      </g>
    </svg>
  )
}

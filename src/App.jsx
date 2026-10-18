import React, { useEffect, useState } from 'react'
import {
  ArrowDown, ArrowDownRight, ArrowLeftRight, ArrowRight, ArrowUpRight,
  BatteryCharging, Bolt, Check, ChevronRight, CircleHelp, ExternalLink,
  Factory, FileText, Gauge, Leaf, Menu, Moon, PlugZap, ShieldCheck,
  Sun, Waves, Wind, X, Zap, TrendingUp, RefreshCcw, Wallet, Clock3,
  Globe2, Download, Lightbulb, Activity, ChartNoAxesCombined
} from 'lucide-react'

const ASSETS = '/assets/'
const REFERENCES = [
  {
    tag: 'RUPTL', name: 'Kementerian ESDM — Paparan RUPTL 2025–2034',
    note: 'Rencana penambahan pembangkit dan storage nasional.',
    href: 'https://gatrik.esdm.go.id/assets/uploads/download_index/files/4ec39-materi-paparan-ruptl-2025-2034.pdf'
  },
  {
    tag: 'PLN', name: 'Paparan Direktur Utama PLN — RUPTL 2025–2034',
    note: 'Komposisi BESS dan PLTA pumped storage.',
    href: 'https://gatrik.esdm.go.id/assets/uploads/download_index/files/06524-bahan-dirut-pln.pdf'
  },
  {
    tag: 'ESDM', name: 'FAQ RUPTL 2025–2034',
    note: 'Proyeksi penjualan listrik 2024 dan 2034.',
    href: 'https://gatrik.esdm.go.id/assets/uploads/download_index/files/daa0b-faq-ruptl-pln-2025-2034.pdf'
  },
  {
    tag: 'IEA', name: 'Integrating Solar and Wind (2024)',
    note: 'Fleksibilitas untuk integrasi pembangkit variabel.',
    href: 'https://www.iea.org/reports/integrating-solar-and-wind'
  },
  {
    tag: 'IEA', name: 'Financing Battery Energy Storage Systems in Indonesia (2026)',
    note: 'Kebutuhan investasi dan tantangan kelayakan proyek BESS.',
    href: 'https://www.iea.org/reports/financing-battery-energy-storage-systems-in-indonesia'
  }
]

const states = [
  {id:'pagi',time:'06.00–10.00',label:'Pagi',icon:Sun,mode:'siaga',short:'Menyesuaikan kondisi pasokan',desc:'Produksi PLTS mulai meningkat. Pengoperasian BESS mengikuti kebutuhan jaringan dan strategi pengisian.',status:'Fleksibilitas operasi',flow:'Jaringan dan sumber terbarukan memasok beban; BESS dapat disiapkan sesuai kebutuhan.'},
  {id:'siang',time:'10.00–15.00',label:'Siang',icon:Sun,mode:'charge',short:'Menyerap energi saat tersedia',desc:'Ketika pasokan energi bersih melebihi kebutuhan yang harus dipenuhi, BESS dapat mengisi baterai untuk memindahkan penggunaan energi ke waktu lain.',status:'Mode pengisian',flow:'PLTS / PLTB → PCS → Battery Bank'},
  {id:'sore',time:'15.00–19.00',label:'Sore',icon:TrendingUp,mode:'discharge',short:'Melepas energi saat dibutuhkan',desc:'Saat produksi surya berkurang dan kebutuhan sistem meningkat, BESS dapat menyalurkan energi yang sebelumnya tersimpan.',status:'Mode penyaluran',flow:'Battery Bank → PCS → Beban / Jaringan'},
  {id:'malam',time:'19.00–06.00',label:'Malam',icon:Moon,mode:'siaga',short:'Merespons kebutuhan jaringan',desc:'BESS dapat siaga, menyalurkan daya, atau diisi dari sumber lain tergantung jadwal operasi, harga, dan bauran pembangkitan.',status:'Operasi terkendali',flow:'Arah energi ditentukan strategi EMS dan kondisi sistem.'}
]

const functions = [
  {icon: ArrowLeftRight, name:'Energy Shifting',accent:'orange',sub:'Memindahkan energi antarwaktu',text:'Menyimpan energi pada saat tersedia dan menyalurkannya ketika diperlukan. Manfaatnya bergantung pada jadwal operasi serta sumber energi pengisian.'},
  {icon: Activity,name:'Power Smoothing',accent:'cyan',sub:'Mengurangi fluktuasi daya',text:'Membantu meredam perubahan keluaran PLTS/PLTB pada titik interkoneksi sesuai kapasitas dan respons kontrol BESS.'},
  {icon: Gauge,name:'Frequency Response',accent:'green',sub:'Menjaga keseimbangan daya',text:'Dapat menambah atau mengurangi daya aktif secara cepat untuk membantu pengaturan frekuensi sistem tenaga.'},
  {icon: Zap,name:'Voltage Support',accent:'yellow',sub:'Mendukung tegangan jaringan',text:'Inverter BESS dengan kemampuan dan pengaturan yang sesuai dapat menyerap atau menyuplai daya reaktif untuk dukungan tegangan.'},
]

const componentDetails = [
  {n: 'Battery Bank',short:'Media penyimpanan elektrokimia',icon:BatteryCharging,desc:'Rangkaian modul baterai yang menyimpan energi. Kapasitas energinya dinyatakan dalam kWh atau MWh.'},
  {n: 'PCS / Inverter',short:'Konversi energi DC ↔ AC',icon:PlugZap,desc:'Menghubungkan baterai DC ke sistem kelistrikan AC serta mengendalikan pertukaran daya aktif dan, bila dirancang, daya reaktif.'},
  {n: 'BMS',short:'Pemantauan dan keselamatan baterai',icon:ShieldCheck,desc:'Battery Management System memantau tegangan sel, temperatur, arus, dan kondisi baterai untuk mendukung keselamatan.'},
  {n: 'EMS',short:'Otak strategi operasi',icon:ChartNoAxesCombined,desc:'Energy Management System mengoordinasikan kapan baterai mengisi, menyalurkan, atau siaga sesuai kebutuhan sistem.'},
]

function Brand({small = false}) {
  return <a className={`brand ${small?'brand--small':''}`} href="#beranda" aria-label="BESSition, kembali ke beranda"><span>BESS</span><em>ition</em><i aria-hidden="true">●</i></a>
}

function Eyebrow({children, icon:Icon=Leaf}){return <span className="eyebrow"><Icon size={15}/>{children}</span>}
function SectionTitle({kicker, heading, subtitle, icon}){
  return <div className="section-title"><Eyebrow icon={icon || Leaf}>{kicker}</Eyebrow><h2>{heading}</h2>{subtitle&&<p>{subtitle}</p>}</div>
}
function LogoPill({children, icon:Icon}){return <span className="logo-pill">{Icon&&<Icon size={14}/>} {children}</span>}
function Stat({value,label,sub,icon:Icon}){return <div className="stat"><div className="stat-top">{Icon&&<Icon size={17}/>}<span>{label}</span></div><strong>{value}</strong><small>{sub}</small></div>}
function LinkOut({href,children}){return <a target="_blank" rel="noreferrer" href={href} className="link-out">{children}<ExternalLink size={13}/></a>}

function EnergyIllustration({current}){
  const mode=current.mode
  return <div className={`energy-illustration ${mode}`}>
    <div className="energy-item generation"><span className="energy-symbol"><Sun size={25}/><Wind size={20}/></span><strong>PLTS / PLTB</strong><small>Sumber energi</small></div>
    <div className="energy-connector"><span className="energy-line"/><span className="energy-dot"/><span className="connection-label">{mode==='charge'?'CHARGING':mode==='discharge'?'DISCHARGING':'TERKENDALI'}</span></div>
    <div className="energy-item storage"><span className="energy-symbol"><BatteryCharging size={30}/></span><strong>BESS</strong><small>PCS · Battery Bank</small></div>
    <div className="energy-connector second"><span className="energy-line"/><span className="energy-dot"/></div>
    <div className="energy-item consumer"><span className="energy-symbol"><Factory size={27}/></span><strong>BEBAN</strong><small>Rumah & industri</small></div>
  </div>
}

function ConceptChart({selected}){
  const positions=[36,120,204,288]
  return <div className="concept-chart">
    <div className="concept-chart-head"><span><i className="legend-dot solar"/> Ilustrasi produksi PLTS</span><span><i className="legend-dot demand"/> Ilustrasi kebutuhan</span></div>
    <svg viewBox="0 0 330 147" role="img" aria-label="Ilustrasi profil produksi surya siang hari dan permintaan sepanjang hari, bukan data aktual">
      <defs><linearGradient id="solgrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#06a66f" stopOpacity=".31"/><stop offset="1" stopColor="#06a66f" stopOpacity="0"/></linearGradient></defs>
      {[28,58,88,118].map(y=><line key={y} x1="17" x2="315" y1={y} y2={y} stroke="#dce9e7" strokeDasharray="4 6" />)}
      <path d="M18 118 C63 118 79 112 105 69 C136 23 166 13 196 65 C223 109 244 118 315 118 L315 128 L18 128Z" fill="url(#solgrad)" />
      <path d="M18 118 C63 118 79 112 105 69 C136 23 166 13 196 65 C223 109 244 118 315 118" fill="none" stroke="#069f66" strokeWidth="3" strokeLinecap="round"/>
      <path d="M18 92 C50 90 69 75 94 75 S142 82 164 91 S214 103 245 70 S296 54 315 71" fill="none" stroke="#178cce" strokeWidth="3" strokeLinecap="round"/>
      <line x1={positions[selected]} x2={positions[selected]} y1="17" y2="128" stroke="#ed783c" strokeWidth="1.8" strokeDasharray="4 4" />
      <circle cx={positions[selected]} cy="17" r="4" fill="#ed783c"/>
      <text x="17" y="141">00</text><text x="88" y="141">06</text><text x="164" y="141">12</text><text x="238" y="141">18</text><text x="313" y="141" textAnchor="end">24</text>
    </svg>
    <small>Skema konseptual — bukan pengukuran maupun hasil simulasi aktual.</small>
  </div>
}

function App(){
  const [active, setActive]=useState(1)
  const [activeFunction,setActiveFunction]=useState(0)
  const [activeComponent,setActiveComponent]=useState(0)
  const [showPoster,setShowPoster]=useState(false)
  const [mobileMenu,setMobileMenu]=useState(false)
  const [copied,setCopied]=useState(false)
  useEffect(()=>{
    document.body.style.overflow=showPoster?'hidden':''
    const esc=(e)=>{if(e.key==='Escape'){setShowPoster(false);setMobileMenu(false)}}
    window.addEventListener('keydown',esc)
    return ()=>{document.body.style.overflow='';window.removeEventListener('keydown',esc)}
  },[showPoster])
  const mode=states[active]
  const selectedFn=functions[activeFunction]
  const selectedComp=componentDetails[activeComponent]
  const nav=[['#tantangan','Tantangan'],['#teknologi','Cara Kerja'],['#manfaat','Peran BESS'],['#roadmap','Roadmap'],['#implementasi','Implementasi']]
  return <>
    <header className="site-header"><div className="container nav-wrap"><Brand small/>
      <nav className={`navigation ${mobileMenu?'open':''}`} aria-label="Navigasi utama">{nav.map(([href,n])=><a key={href} href={href} onClick={()=>setMobileMenu(false)}>{n}</a>)}<button className="nav-poster-mobile" onClick={()=>{setShowPoster(true);setMobileMenu(false)}}>Lihat poster</button></nav>
      <div className="header-actions"><button className="outline-btn header-poster" onClick={()=>setShowPoster(true)}><FileText size={15}/> Lihat Poster</button><button className="menu-btn" aria-label={mobileMenu?'Tutup menu':'Buka menu'} aria-expanded={mobileMenu} onClick={()=>setMobileMenu(!mobileMenu)}>{mobileMenu?<X/>:<Menu/>}</button></div>
    </div></header>

    <main>
      <section id="beranda" className="hero section-wave"><div className="hero-sun"/><div className="cloud c1"/><div className="cloud c2"/>
        <div className="container hero-grid">
          <div className="hero-copy"><Eyebrow icon={Leaf}>INTEGRASI ENERGI TERBARUKAN · INDONESIA</Eyebrow>
            <h1 className="hero-title-updated">BESS<span>ition</span></h1>
            <p className="hero-lead hero-lead-updated">Peran <strong>Battery Energy Storage System</strong> dalam Mendukung Integrasi Energi Terbarukan Indonesia Menuju <strong>Net-Zero Emission 2060.</strong></p>
            <div className="hero-actions"><a className="primary-btn" href="#teknologi">Jelajahi Teknologi <ArrowRight size={17}/></a><a href="#roadmap" className="secondary-btn">Lihat Roadmap RUPTL <ArrowDownRight size={16}/></a></div>
          </div>
          <div className="hero-art"><div className="hero-art-light"/><img src={`${ASSETS}bess-components.webp`} alt="Ilustrasi orisinal ekosistem BESS, pembangkit energi terbarukan, jaringan, industri, dan baterai"/><div className="floating-label a"><Bolt size={15}/> ENERGY STORAGE</div><div className="floating-label b"><Wind size={15}/> GREEN GRID</div></div>
        </div>
        <div className="container hero-stats"><Stat icon={Sun} label="Rencana tambahan PLTS" value="17,1 GW" sub="RUPTL 2025–2034"/><Stat icon={Wind} label="Rencana tambahan PLTB" value="7,2 GW" sub="RUPTL 2025–2034"/><Stat icon={BatteryCharging} label="Rencana storage" value="10,3 GW" sub="BESS + pumped storage"/><Stat icon={Leaf} label="Arah transisi" value="NZE 2060" sub="Target emisi bersih nasional"/></div>
      </section>

      <section id="tantangan" className="section problem-section"><div className="container"><SectionTitle icon={TrendingUp} kicker="01 · MENGAPA PERLU PENYIMPANAN?" heading={<>Energi terbarukan terus tumbuh.<br/><span>Waktunya belum tentu sesuai kebutuhan.</span></>} subtitle="Penetrasi PLTS dan PLTB menghadirkan kebutuhan fleksibilitas karena produksi dan konsumsi listrik tidak selalu terjadi pada waktu yang sama."/>
        <div className="problem-grid"><article className="card demand-card"><div className="card-kicker"><TrendingUp size={16}/> PROYEKSI PENJUALAN LISTRIK</div><div className="demand-numbers"><div><span>2024</span><strong>306 <small>TWh</small></strong></div><ArrowRight className="up-arrow"/><div><span>2034</span><strong>511 <small>TWh</small></strong></div></div><div className="increase"><span>+205 TWh</span> peningkatan menurut proyeksi RUPTL</div><p>Permintaan listrik bertambah, sementara karakteristik produksi PLTS dan PLTB bergantung pada cuaca serta waktu.</p><small className="source-label">Sumber: FAQ RUPTL PLN 2025–2034, ESDM.</small></article>
          <article className="card variance-card"><div className="card-kicker"><Waves size={16}/> INTERMITTENCY & MISMATCH</div><ConceptChart selected={active}/><div className="variance-foot"><Sun size={18}/><span>Produksi surya berubah sepanjang hari.</span></div><div className="variance-foot"><Bolt size={18}/><span>Kebutuhan listrik mengikuti pola aktivitas konsumen.</span></div></article>
        </div>
        <div className="problem-takeaway"><div><Lightbulb size={23}/></div><p><strong>Intinya:</strong> BESS membantu memindahkan pemanfaatan energi antarwaktu dan menyediakan layanan fleksibilitas, bukan menciptakan energi baru.</p></div>
      </div></section>

      <section id="teknologi" className="section tech-section section-wave"><div className="container"><SectionTitle icon={BatteryCharging} kicker="02 · SKEMA IMPLEMENTASI BESS" heading={<>Teknologi di balik <span>penyimpanan energi.</span></>} subtitle="Eksplorasi empat komponen utama dari ekosistem BESS pada ilustrasi asli poster."/>
        <div className="tech-grid"><div className="illustration-panel"><div className="illustration-top"><LogoPill icon={Zap}>SKEMA IMPLEMENTASI</LogoPill><span>Ilustrasi oleh tim KOK JANGGAL</span></div><img src={`${ASSETS}bess-components.webp`} alt="Skema isometrik BESS dari poster, menunjukkan PV, angin, jaringan, baterai, dan kontrolnya"/></div>
          <div className="tech-info"><div className="tech-intro"><span className="mini-kicker">KOMPONEN BESS</span><h3>Empat sistem, <span>satu aliran energi.</span></h3><p>Pilih komponen untuk memahami fungsinya di sistem penyimpanan energi.</p></div><div className="components-list">{componentDetails.map((x,i)=>{const Icon=x.icon;return <button className={`component-item ${i===activeComponent?'selected':''}`} key={x.n} onClick={()=>setActiveComponent(i)} aria-pressed={i===activeComponent}><span className="component-icon"><Icon size={21}/></span><span><strong>{x.n}</strong><small>{x.short}</small></span><ChevronRight size={16}/></button>})}</div><div className="component-detail"><div className="detail-head"><span className="detail-label">KOMPONEN TERPILIH</span><Check size={17}/></div><h4>{selectedComp.n}</h4><p>{selectedComp.desc}</p></div></div>
        </div>
      </div></section>

      <section id="simulasi" className="section flow-section"><div className="container"><div className="flow-grid"><div className="flow-copy"><Eyebrow icon={RefreshCcw}>03 · SIMULASI KONSEPTUAL</Eyebrow><h2>Ikuti aliran energi <span>sepanjang hari.</span></h2><p>Pilih waktu untuk melihat contoh peran BESS saat sumber terbarukan dan kebutuhan listrik berubah.</p><div className="time-switch" role="group" aria-label="Pilih waktu ilustrasi operasi BESS">{states.map((s,i)=>{const Icon=s.icon;return <button key={s.id} aria-pressed={i===active} className={i===active?'active':''} onClick={()=>setActive(i)}><Icon size={16}/>{s.label}</button>})}</div><div className="time-detail"><div className="time-heading"><span>{mode.time}</span><strong>{mode.status}</strong></div><h3>{mode.short}</h3><p>{mode.desc}</p></div></div><div className="flow-visual card"><div className="flow-visual-head"><span className="small-upper">ALIRAN DAYA · {mode.label.toUpperCase()}</span><span className={`mode-badge ${mode.mode}`}>{mode.status}</span></div><EnergyIllustration current={mode}/><div className="flow-path-text"><ArrowRight size={16}/>{mode.flow}</div><div className="flow-disclaimer"><CircleHelp size={15}/> Ilustrasi prinsip kerja, bukan simulasi fisik atau data pengukuran.</div></div></div></div></section>

      <section id="manfaat" className="section benefits-section"><div className="container"><SectionTitle icon={Zap} kicker="04 · NILAI TAMBAH BESS" heading={<>Empat kontribusi BESS <span>untuk jaringan.</span></>} subtitle="Pilih tiap fungsi untuk mengetahui bagaimana BESS mendukung operasi sistem tenaga."/>
        <div className="benefits-grid"><div className="benefit-tabs">{functions.map((f,i)=>{const Icon=f.icon;return <button aria-pressed={i===activeFunction} className={`benefit-tab ${activeFunction===i?'active':''}`} onClick={()=>setActiveFunction(i)} key={f.name}><span className={`benefit-tab-icon ${f.accent}`}><Icon size={22}/></span><span><strong>{f.name}</strong><small>{f.sub}</small></span><ArrowUpRight size={18}/></button>})}</div><div className="benefit-display"><div className={`benefit-big-icon ${selectedFn.accent}`}>{React.createElement(selectedFn.icon,{size:36})}</div><span className="small-upper">FUNGSI #{String(activeFunction+1).padStart(2,'0')}</span><h3>{selectedFn.name}</h3><p>{selectedFn.text}</p><div className="benefit-note"><ShieldCheck size={19}/><span>Kemampuan aktual bergantung pada spesifikasi perangkat, pengaturan, dan kondisi sistem.</span></div></div></div>
      </div></section>

      <section id="roadmap" className="section roadmap-section section-wave"><div className="container"><SectionTitle icon={Globe2} kicker="05 · ROADMAP PENYIMPANAN ENERGI" heading={<>Indonesia menyiapkan <span>10,3 GW storage.</span></>} subtitle="Rencana tambahan kapasitas penyimpanan energi dalam RUPTL PLN 2025–2034, terdiri dari BESS dan PLTA pumped storage."/>
        <div className="roadmap-grid"><div className="roadmap-card card"><div className="card-kicker"><BatteryCharging size={16}/> KOMPOSISI STORAGE</div><div className="storage-number">10,3 <small>GW</small></div><div className="storage-bar" aria-label="Rencana kapasitas BESS 6 GW dan pumped storage 4,3 GW"><div className="bess-part" style={{flex:6}}><BatteryCharging size={19}/><strong>6,0 GW</strong></div><div className="pump-part" style={{flex:4.3}}><Waves size={20}/><strong>4,3 GW</strong></div></div><div className="storage-caption"><span><b className="dot bess"/> BESS: 6 GW / 27 GWh</span><span><b className="dot pumped"/> Pumped storage: 4,3 GW</span></div><p>Besaran GW menyatakan daya. Untuk BESS, 27 GWh menyatakan kapasitas energi rencana.</p></div>
          <div className="roadmap-card card"><div className="card-kicker"><Clock3 size={16}/> TAHAP PENGEMBANGAN</div><div className="phase-heading"><span>2025–2029</span><span>2030–2034</span></div><div className="phase-bar"><div style={{flex:3}} className="phase-1"><strong>3,0 GW</strong></div><div style={{flex:7.3}} className="phase-2"><strong>7,3 GW</strong></div></div><div className="phase-insight"><strong>71%</strong><span>rencana penambahan storage berada pada periode 2030–2034.</span></div><p>Nilai 3,0 GW dan 7,3 GW adalah penambahan storage per periode, bukan kapasitas BESS terpasang.</p></div></div>
        <div className="roadmap-smallprint"><FileText size={16}/> Angka merupakan rencana menurut paparan RUPTL. Detail 4,3 GW pumped storage menggunakan paparan teknis PLN dan dokumen penjelasan poster. <a href="#referensi">Lihat referensi <ArrowRight size={13}/></a></div>
      </div></section>

      <section id="implementasi" className="section challenges-section"><div className="container"><SectionTitle icon={Wallet} kicker="06 · TANTANGAN IMPLEMENTASI" heading={<>Teknologi tersedia. <span>Proyek perlu layak investasi.</span></>} subtitle="IEA menyoroti pentingnya kepastian regulasi, arus kas, dan pembiayaan untuk percepatan BESS Indonesia."/>
        <div className="finance-grid"><div className="investment card"><div className="card-kicker"><Wallet size={16}/> ESTIMASI KEBUTUHAN INVESTASI</div><strong className="investment-total">USD 5 <small>miliar</small></strong><p>Estimasi investasi proyek BESS selama 2026–2034, menurut kajian IEA.</p><div className="investment-chart"><div className="invest-block"><span><b>PLN</b><b>60%</b></span><div className="track"><div className="fill" style={{width:'60%'}}/></div><small>~USD 3 miliar</small></div><div className="invest-block swasta"><span><b>Sektor swasta</b><b>40%</b></span><div className="track"><div className="fill" style={{width:'40%'}}/></div><small>~USD 2 miliar</small></div></div><div className="finance-note"><CircleHelp size={17}/> Ini estimasi investasi yang dibutuhkan, bukan dana yang telah direalisasikan.</div></div>
        <div className="challenge-list"><article><div className="challenge-icon"><FileText size={21}/></div><div><h3>Regulasi BESS standalone</h3><p>Klasifikasi aset, perizinan, dan skema remunerasi membutuhkan kepastian.</p><span>Arah solusi: kerangka regulasi yang lebih jelas.</span></div></article><article><div className="challenge-icon"><ChartNoAxesCombined size={21}/></div><div><h3>Pendapatan jangka panjang</h3><p>Proyek memerlukan kepastian pembayaran layanan kapasitas dan fleksibilitas.</p><span>Arah solusi: kontrak dan skema pembayaran layanan.</span></div></article><article><div className="challenge-icon"><ShieldCheck size={21}/></div><div><h3>Degradasi & kelayakan ekonomi</h3><p>CAPEX, efisiensi, umur baterai, dan intensitas pemakaian memengaruhi LCOS.</p><span>Arah solusi: operasi cermat dan perencanaan siklus hidup.</span></div></article></div></div>
      </div></section>

      <section className="section closing-section"><div className="container closing-inner"><div><Eyebrow icon={Leaf}>INDONESIA · NET-ZERO EMISSION 2060</Eyebrow><h2>Energi bersih tidak cukup <span>hanya dibangkitkan.</span></h2><p>Integrasi energi terbarukan membutuhkan sistem tenaga yang fleksibel. BESS adalah salah satu teknologi pendukungnya, bersama penguatan jaringan, pembangkit fleksibel, dan respons permintaan.</p><a href="#referensi" className="closing-link">Telusuri sumber & data <ArrowRight size={18}/></a></div><div className="pathway"><div><Sun/><span>EBT</span></div><ArrowRight/><div><BatteryCharging/><span>BESS</span></div><ArrowRight/><div><PlugZap/><span>Jaringan</span></div><ArrowRight/><div><Leaf/><span>NZE 2060</span></div></div></div></section>

      <section id="referensi" className="section sources-section"><div className="container"><SectionTitle icon={FileText} kicker="DATA & REFERENSI" heading={<>Referensi yang <span>dapat ditelusuri.</span></>} subtitle="Tautan berikut menjadi dasar angka dan konsep yang digunakan di website."/>
      <div className="references-grid">{REFERENCES.map((r,i)=><a key={r.href} className="reference-item" href={r.href} target="_blank" rel="noreferrer"><span className="ref-index">0{i+1}</span><div><span className="ref-tag">{r.tag}</span><h3>{r.name}</h3><p>{r.note}</p></div><ExternalLink size={18}/></a>)}</div><div className="source-download"><div><FileText size={21}/><span>Deskripsi & Referensi INFOGREEN 2026</span></div><a href={`${ASSETS}sumber-poster-infogreen-2026.pdf`} target="_blank" rel="noreferrer" download>Unduh PDF <Download size={16}/></a></div></div></section>
    </main>
    <footer><div className="container footer-inner"><div><Brand small/><p>KOK JANGGAL · Institut Teknologi Sepuluh Nopember</p></div><div className="footer-links"><a href="#beranda">Ke atas ↑</a><button onClick={()=>setShowPoster(true)}>Buka poster</button><a href="#referensi">Referensi</a></div><span className="footer-copyright">© 2026 BESSition</span></div></footer>

    {showPoster&&<div className="modal-backdrop" role="presentation" onClick={()=>setShowPoster(false)}><div className="poster-modal" role="dialog" aria-modal="true" aria-label="Lihat poster BESSition" onClick={e=>e.stopPropagation()}><div className="modal-head"><strong>Poster BESSition — INFOGREEN 2026</strong><button aria-label="Tutup poster" onClick={()=>setShowPoster(false)}><X size={20}/></button></div><div className="modal-image"><img src={`${ASSETS}poster-reference.webp`} alt="Poster INFOGREEN 2026 BESSition"/></div></div></div>}
  </>
}
export default App

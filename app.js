const dayTabs = document.querySelectorAll(".day-tab");
const dayPanels = document.querySelectorAll(".day-panel");
const routeDayButtons = document.querySelectorAll(".route-day-button");
const routeMap = document.querySelector("#routeMap");
const navStops = document.querySelector("#navStops");

const routes = {
  day1: [
    {
      time: "09:50",
      name: "莆田站",
      query: "莆田站",
      note: "第一天起点。动车抵达后先去酒店寄存行李，站区出发优先走东出口。",
      x: 16,
      y: 86,
      mode: "driving",
    },
    {
      time: "10:25",
      name: "全季酒店兴化府步行街店",
      mapLabel: "全季酒店",
      query: "全季酒店 莆田万达广场兴化府步行街店 胜利南街399号",
      note: "寄存行李。晚上回酒店也以这个点为终点。",
      x: 34,
      y: 72,
      mode: "driving",
    },
    {
      time: "12:20",
      name: "阿昌豆浆炒",
      query: "阿昌豆浆炒 莆田",
      note: "第一段午餐先吃豆浆炒，点小份尝味道，给后面的扁食和泗粉留胃口。",
      x: 52,
      y: 88,
      mode: "walking",
    },
    {
      time: "12:50",
      name: "建设路龙桥扁食",
      mapLabel: "龙桥扁食",
      query: "建设路龙桥扁食 莆田",
      note: "第二段午餐单独导航，重点点拌泗粉加猪杂汤，和阿昌豆浆炒分开吃。",
      x: 74,
      y: 78,
      mode: "walking",
    },
    {
      time: "13:20",
      name: "兴化府历史文化街区",
      mapLabel: "兴化府街区",
      query: "莆田 兴化府历史文化街区 古谯楼 文献路",
      note: "老城 citywalk，顺路看古谯楼、文献路。",
      x: 83,
      y: 60,
      mode: "walking",
    },
    {
      time: "14:00",
      name: "广化寺",
      query: "莆田 广化寺",
      note: "下午主点位，留足 1.5-2 小时。",
      x: 24,
      y: 24,
      mode: "driving",
    },
    {
      time: "16:20",
      name: "糖阿酸·阿酸糖水铺",
      mapLabel: "糖阿酸",
      query: "糖阿酸 阿酸糖水铺 莆田总店 东大路542弄",
      note: "四果汤推荐这家，放在广化寺后面补清爽甜口，第一天喝过第二天就不用重复。",
      x: 68,
      y: 22,
      mode: "driving",
    },
    {
      time: "16:50",
      name: "芋喜来",
      query: "芋喜来 莆田",
      note: "便宜好喝，和糖阿酸分成两个点；如果想坐久一点，再把这一站换成有树 Usure。",
      x: 86,
      y: 37,
      mode: "driving",
    },
    {
      time: "18:30",
      name: "莆田菜正餐",
      mapLabel: "莆田菜正餐",
      query: "闽食佬兴化卤面 莆田菜 焖豆腐 荔枝肉",
      note: "晚餐升级成正餐：卤面、焖豆腐、荔枝肉、海蛎煎/海蛎饼，胃口够再加兴化炒米粉。",
      x: 60,
      y: 50,
      mode: "driving",
    },
    {
      time: "20:30",
      name: "杨氏大肠炝",
      query: "杨氏大肠炝 莆田",
      note: "夜宵备选，图片备注晚上开，必加油条。",
      x: 34,
      y: 56,
      mode: "walking",
    },
  ],
  day2: [
    {
      time: "08:30",
      name: "全季酒店兴化府步行街店",
      mapLabel: "全季酒店",
      query: "全季酒店 莆田万达广场兴化府步行街店 胜利南街399号",
      note: "第二天从酒店出发，行李先放酒店。",
      x: 18,
      y: 74,
      mode: "walking",
    },
    {
      time: "08:45",
      name: "求生煎包",
      query: "求生煎包 莆田 十字街",
      note: "早餐主推求生煎包。锅边糊不是同一家店，本路线不合并导航；想吃再在附近搜锅边糊或泗粉。",
      x: 42,
      y: 66,
      mode: "walking",
    },
    {
      time: "09:40",
      name: "绶溪公园",
      query: "莆田 绶溪公园",
      note: "上午散步拍照，天气太热就缩短停留。",
      x: 74,
      y: 34,
      mode: "driving",
    },
    {
      time: "11:40",
      name: "阿文炝肉补漏餐",
      mapLabel: "阿文炝肉",
      query: "东门兜阿文炝肉 天天王 天九王 炝肉 莆田",
      note: "第一晚已吃正餐就选炝肉，搭配扁食或泗粉；没吃正餐就回头补卤面和焖豆腐。",
      x: 76,
      y: 54,
      mode: "driving",
    },
    {
      time: "12:30",
      name: "莆田红团非遗体验店",
      mapLabel: "红团非遗店",
      query: "莆田红团非遗体验店 兴化府历史文化街区",
      note: "红团推荐这一站，适合顺手买即食红团或伴手礼，离兴化府街区近，不额外绕远。",
      x: 78,
      y: 70,
      mode: "walking",
    },
    {
      time: "12:50",
      name: "糖阿酸·阿酸糖水铺",
      mapLabel: "糖阿酸",
      query: "糖阿酸 阿酸糖水铺 莆田总店 东大路542弄",
      note: "四果汤补漏推荐这家；如果第一天已经喝过，就把这一站跳过，直接回酒店取行李。",
      x: 56,
      y: 82,
      mode: "walking",
    },
    {
      time: "13:20",
      name: "全季酒店取行李",
      mapLabel: "酒店取行李",
      query: "全季酒店 莆田万达广场兴化府步行街店 胜利南街399号",
      note: "回酒店取行李，预留去动车站时间。",
      x: 39,
      y: 48,
      mode: "driving",
    },
    {
      time: "14:59",
      name: "莆田站",
      query: "莆田站",
      note: "G3332 莆田站 14:59 - 福州站 15:41；市区进站西进站口相对近。",
      x: 18,
      y: 88,
      mode: "driving",
    },
  ],
};

function amapSearchUrl(stop) {
  const params = new URLSearchParams({
    keyword: stop.query,
    city: "莆田",
    view: "map",
    src: "codex_putian_h5",
  });
  return `https://uri.amap.com/search?${params.toString()}`;
}

function baiduDirectionUrl(stop, origin, mode = "driving") {
  const params = new URLSearchParams({
    origin: origin ? origin.query : "我的位置",
    destination: stop.query,
    mode,
    region: "莆田",
    output: "html",
    src: "codex.putian.h5",
  });
  return `https://api.map.baidu.com/direction?${params.toString()}`;
}

function renderRoute(dayKey) {
  const stops = routes[dayKey];
  if (!routeMap || !navStops || !stops) return;

  routeMap.innerHTML = [
    '<div class="map-path" aria-hidden="true"></div>',
    ...stops.map((stop, index) => `
      <button class="map-stop${index === 0 ? " active" : ""}" type="button" data-stop-index="${index}" style="--x: ${stop.x}%; --y: ${stop.y}%">
        <strong>${String(index + 1).padStart(2, "0")}</strong>
        <span>${stop.mapLabel || stop.name}</span>
      </button>
    `),
  ].join("");

  navStops.innerHTML = stops.map((stop, index) => {
    const prev = stops[index - 1];
    const legMode = stop.mode || "driving";
    return `
      <li class="nav-stop" id="stop-${dayKey}-${index}">
        <div class="nav-stop-header">
          <span class="nav-stop-index">${index + 1}</span>
          <div>
            <h3>${stop.time} · ${stop.name}</h3>
            <p>${stop.note}</p>
          </div>
        </div>
        <div class="nav-actions">
          <a class="nav-action primary" target="_blank" rel="noopener" href="${baiduDirectionUrl(stop, null, "driving")}">导航到这里</a>
          <a class="nav-action${prev ? "" : " disabled"}" target="_blank" rel="noopener" href="${prev ? baiduDirectionUrl(stop, prev, legMode) : "#"}">从上一站导航</a>
          <a class="nav-action" target="_blank" rel="noopener" href="${amapSearchUrl(stop)}">高德搜点</a>
        </div>
      </li>
    `;
  }).join("");

  routeMap.querySelectorAll(".map-stop").forEach((button) => {
    button.addEventListener("click", () => {
      routeMap.querySelectorAll(".map-stop").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      const index = button.dataset.stopIndex;
      document.querySelector(`#stop-${dayKey}-${index}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
}

dayTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.day;
    dayTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", active ? "true" : "false");
    });
    dayPanels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === target);
    });
  });
});

routeDayButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.routeDay;
    routeDayButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", active ? "true" : "false");
    });
    renderRoute(target);
  });
});

renderRoute("day1");

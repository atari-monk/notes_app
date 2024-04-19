const htmlString = `<pre><code class="language-typescript hljs" data-highlighted="yes"><span class="hljs-meta">@Injectable</span>()
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">LoggerMiddleware</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">NestMiddleware</span> {
  <span class="hljs-title function_">use</span>(<span class="hljs-params">req: <span class="hljs-built_in">any</span>, res: <span class="hljs-built_in">any</span>, next: ()=&gt;<span class="hljs-built_in">void</span></span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'Request...'</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toDateString</span>())
    <span class="hljs-title function_">next</span>()
  } 
}
</code></pre>`

const tempElement = document.createElement('div')
tempElement.innerHTML = htmlString

const codeElement = tempElement.querySelector('code[class*="language-"]')
console.log(codeElement)

<template>
	<div class="ex-word">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<!-- “e 享时代”创新消费商业服务平台基本规则 -->
		<div class="ex-word-cnt" v-if='id=="1"'>
		<h3>“e 享时代”创新消费商业服务平台基本规则</h3>
		<b>一、“e 享时代”简介</b>
		<p>“e享时代”是深圳前海易享时代商业服务有限公司（以下简称“本公司”）经
		过多年的研究并学习海内外分享经济的成功模式，自主研发出来的实体经济+移动互联
		网+大数据服务+全球市场化的集广大企业（即卖家）与消费者（即买家）于一体的商
		业服务平台（ 以下简称为“e享时代”或“平台” ），并在 2016年 9 月至 11月份
		期间申请并获得了多项独立自主研发的知识产权。平台是以服务中国中小企业的需求
		为目的，以消费者的消费福利为原则，携手全国运营商（即深圳易享时代运营服务公
		司）、代理商（即各地省、市、县区域代理公司）、供货家（即商家）及合作方（即
		独立第三方与战略合作伙伴单位）一起共建的“跨界资源整合、合作分享共赢”的商
		业服务模式，实现线上线下全品类商业链接、联动、互通，赋予消费者更多权益，从
		消费者转变成为消费商，真正创造一个以共赢精神为核心的未来。</p>
		<p>“e享时代”为解决当前企业面临全球竞争的挑战，助力实体产业结构性革新和
		农村产业化结构调整，深化供给侧改革，助力农村致富，让改革促进消费，让消费拉
		动国内经济增值，让消费市场良性流通循环，使消费者实质受益，让消费者敢消费、
		愿消费、不断促进消费。同时积极协助中国企业拓展国际合作空间，围绕“一带一路”
		国际战略，为中国企业增加新的全球市场机遇和跑道，让世界了解中国品牌，让中国
		品牌服务世界。</p>
		<p>深圳前海易享时代商业服务有限公司坚决拥护中办、国办关于《促进移动互联网
		健康有序发展的意见》，以公正、开放、透明的态度，承诺严格遵守国家法律、法规
		和地方政府政策，并愿意接受相关政府部门的监督和指导。</p>
		<b>二、会员</b>
		<p>凡认可 e享时代商业服务平台规则的企业与消费者均可自愿申请成为 e享时代的
		会员，成为平台的免费会员或 VIP会员即可获得平台的相关权益。本规则的最终解释
		权属于深圳前海易享时代商业服务有限公司。
		<p>1、申请免费会员。不论是商家而是消费者，只要认可《会员服务协议》，均可自
		愿经会员推荐申请或通过公司注册登录页面直接申请成为免费消费者会员或商家会员。</p>

		<p>2、升级 VIP会员。任何免费会员一次性交 998元终身会费即升级为 VIP会员，同
		时获得会费等额 e积分。VIP会员如果退会，其所交会费不予退回。</p>
		<p>3、入会原则：实行“入会自愿，退会自由；交费升级，会费不退”的原则。</p>
		<p>4、会员的权力与收益：</p>
		<p>⑴.推荐会员；</p>
		<p>⑵.获得联盟商家赠送的消费金额等额 e积分或联盟商家自愿赠送的相应 e积分；</p>
		<p>⑶.每天通过 e积分分享规则获得对应比例的享积分；</p>
		<p>⑷.随时将享积分兑现为平台资金；</p>
		<p>⑸.随时将平台资金转存银行；</p>
		<p>⑹.获得会员消费推荐收益和 VIP会员升级推荐收益。不论是免费会员而是 VIP会
		员，每推荐一名会员升级为 VIP会员，均能获得 180元现金推荐收益，同时免费会员
		还能获得升级费用等额 e收益 0.5%的推荐收益，VIP会员获得免费会员十倍即 5%的推
		荐收益；</p>
		<p>⑺.VIP会员消费推荐收益是免费会员的十倍，即享受消费者消费积分 5%的 e积分
		收益，消费推荐收益享受一代；</p>
		<p>⑻. VIP会员有权推荐代理商，并获得运营商给予的代理保证金 10%的 e积分和 5%
		的现金推荐收益；</p>
		<p>⑼.VIP会员有权推荐权限管理员，并获得运营商给予的 10%的现金推荐收益；</p>
		<p>⑽.VIP会员有权申请成为区域权限管理员。成为区域权限管理员的 VIP会员，有
		权推荐权限管理员，有权独立开展业务，有权在全国范围内开拓市场和服务联盟商家，
		并有权获得运营商给予的 10%的权限管理员现金推荐奖、10%的权限管理员现金促成奖、
		商家让利额 20%的商家 e积分服务奖；</p>
		<p>⑾.平台规定的其他权益。</p>
		<p>5、有效消费者会员帐号。一个消费者用一个手机号，对应自己的身份证号，只能
		注册申请一个会员帐号即会员 ID号，通过实名认证，绑定与身份证相同姓名的银行卡
		号或帐号。银行帐号的户名必须与身份证的姓名一致。</p>
		<p>6、有效商家会员帐号。一个商家用一个手机号，对应商家唯一的营业执照号码，
		只能注册申请一个商家会员帐号即会员 ID号，通过公司法定代表人或负责人的实名认
		证，绑定与公司法定代表人身份证相同姓名的银行卡号或帐号。银行帐号的户名必须
		与公司法定代表人或负责人身份证的姓名一致。</p>

		<p>商家会员实名认证：①法人营业执照为法定代表人实名认证；②非法人分支机构
		或个体工商户为营业执照负责人实名认证；③如果是商家法定代表人或负责人委托他
		人申请商家入驻注册的会员，则必须出具商家法定代表人或负责人亲自授权的《商家
		入驻授权委托书》（统一文本格式）。</p>
		<p>7、每个会员只能注册一个通过实名认证的有效会员帐号（即会员 ID号），即一
		个有效身份证号码或有效营业执照号码绑定一个手机号码均只能申请注册一个有效会
		员帐号。</p>
		<p>8、会员注册流程（详见相关资料公开示意图介绍）</p>
		<p>9、会员注册申请时必须网签《会员服务协议》，会员必须严格遵守协议约定内容。</p>
		<b>三、商家加盟</b>
		<p>每个合法企业均可先申请成为平台的免费会员，然后按入驻要求申请成为联盟商
		家，并可自愿申请成为 VIP商家会员。</p>
		<p>1、商家入驻加盟必须符合以下条件，将相应清晰的证照图片上传 e 享时代平台后，
		经后台审核通过。</p>
		<p>（1）、按要求填写相关详细内容,包括店铺名称、法定代表人姓名、地址、电话、
		邮箱等；</p>
		<p>（2）、门头照；</p>
		<p>（3）、店内商品存列照片两张以上；</p>
		<p>（4）、上传营业执照。不是三证合一的老营业执照，还必须上传税务登记证、机
		构代码证；</p>
		<p>（5）、如果是特许经营行业，必须上传特许行业经营许可证；</p>
		<p>(6)、法定代表人身份证正反面照片，非法人经营机构或个体工商户上传负责人身
		份证。</p>
		<p>(7)、法定代表人手持身份证照片。个体工商户上传负责人手持身份证照片。</p>
		<p>(8)、如果商家法定代表人或负责人委托他人注册申请商家会员，则必须出具商家
		法定代表人或负责人亲自授权的《商家入驻授权委托书》(统一文本格式)。</p>
		<p>(9)、法定代表人或负责人或授权委托人个人银行帐户，包括开户银行及其开户分
		支行规范的名称、入驻申请人户名、帐号。</p>
		<p>(10)、填写完整并签名盖章的《e享时代网上联盟商城联盟商家承诺书》照片</p>

		<p>(11)、网签《联盟商城入驻协议书》</p>
		<p>2、联盟商家的监管。</p>
		<p>联盟商家按公司注册地址归属于当地运营中心代理公司监管，还没有成立运营中
		心代理公司的区域由上一级代理公司监管，如果当地省、市、县都还没有成立运营中
		心代理公司，则由运营总公司监管。
		监管内容包括是否严格履约、是否涉嫌违规或虚假交易。</p>
		<p>3、联盟商家书面承诺书包括如下内容：</p>
		<p>（1）、在系统注册时提交的资料是真实且合法；</p>
		<p>（2）、不对 e享时代会员销售假冒伪劣商品；</p>
		<p>（3）、不对 e享时代会员出现虚抬物价行为；</p>
		<p>（4）、不在 e享时代平台做出虚假消费行为；</p>
		<p>（5）、不对 e享时代平台做出误导及虚假传播行为；</p>
		<p>（6）、不违反合同约定迟延支付或止付约定让利款的行为。</p>
		<p>4、商家加盟的限制和禁止性规定如下。</p>
		<p>（1）、限制加盟的商家范围：大宗商品行业（如：房地产销售、汽车销售等）、
		高档商品行业（如：珠宝、贵金属商品、字画、古董、高档艺术品、高档侈奢品等）、
		非商品咨询代理服务行业（如：租金、工资等）、金融资产服务行业（如：理财产品、
		金融资产产品、非上市公司股权资产产品等）、服务类行业（如：油卡代理服务、汽
		车服务、家政服务、非证券理财服务、保险代理服务等）等行业的商家。目的是为了
		①保证平台健康平稳发展；②有效保证真实交易；③便于促进行业联动发展；④属于
		国家特殊的特许经营行业。这类商家仅允许与当地代理公司实行行业联盟合作经营。</p>
		<p>（2）、禁止入驻加盟的商家范围。</p>
		<p>行政、非盈利性单位或协会，非法经营企业或单位、政策性银行、国家控股商业
		银行、国有资产参股控股银行、保险公司、国家管控物资（商品）、公益事业（学校、
		医疗、公益基金等）、证券公司、公募基金、无固定经营场所企业或单位、虚拟产品
		企业、生物技术、非企业类科研院所等。</p>
		<p>5、商家让利规则。商家让利 15%参与消费分享联盟，消费分享实行 T+3日合规性
		和真实性审核， “T”在此表示时间“天”。“T+3”表述的意思如下：</p>
		<p>1、第一天（即 T 日），发生商品销售的当天，商家将通过平台销售的商品，在当
		天规定申报截止时间点之前按消费者逐人申报到平台审核。</p>

		<p>2、第二天（即 T+1 日），次日规定截止时间点之前，商家将平台审核通过的消费
		金额逐人将 15%的消费分享让利款足额汇入 e享时代消费分享专用银行帐户，汇款到账
		视为收讫。</p>
		<p>3、第三天（即 T+2 日），销售让利款审核无误后，平台软件系统在每天设置的时
		间截点（现在为下午 4点），按规则在当天下午 24 点之前自动将消费 e 享分和商家激
		励 e积分分配到相应的会员 ID。</p>
		<p>4、第四天（即 T+3 日），按平台积分分享管理规则，平台软件系统将消费者和商
		家会员 ID 的消费“e 积分”和商家让利激励“e 积分” ，在每天设置的时间截点（现
		在为上午 0点至 0点 30分）自动转换成为“享积分”。</p>
		<b>四、消费分享与分享转换规则</b>
		<p>（一）、商家让利消费者及其消费者消费分享规则。</p>
		<p>平台将消费者的消费金额或商家的让利金额记录为等量 e积分（即消费积分或让
		利激利积分），其积分转换规则如下：</p>
		<p>100 元人民币消费或商家让利，转换为 100 个消费 e 积分或让利激励 e积分；</p>
		<p>1 个单元 e 积分=100 个 e 积分；1 个消费 e 积分等值于 1 个让利激励 e积分；</p>
		<p>1 个 e 积分可转换为 1 个享积分。</p>
		<p>1、商家销售让利给消费者分享的让利比例为消费金额的 15%，平台将该让利款分成两部分：</p>
		<p>①将商家让利的 10/15归入“消费分享储备金”(亦称“消费分享储备金”)，其
		中商家让利的 9/15用于会员每天剩余 e积分总量的 1‰左右转换为享积分，商家让利
		的 1/15用于运营商的业务推广与市场开发。</p>
		<p>②同时将商家让利的 5/15归入“激励分享储备金”，其中商家让利的 4/15用于
		商家当天实际剩余总量“激励 e 积分”按当天的激励值转换为享积分、全国公益活动，
		商家让利的 1/15用于软件开发及平台的运营维护与管理。</p>
		<img src="../../assets/images/word1.png" alt="">
		<center>（商家让利消费者及其消费者消费分享规则示意图）</center>
		<p>（二）、消费者的消费金额与联盟商家的销售让利款的 e 积分录入规则，与两种 不同转换为“享积分”的 方式。</p>
		<p>1、消费者每完成一次消费行为，则①将其消费金额录入等量消费 e 积分；②将该 笔联盟商家 15%的让利款分别录入 10%(指销售额的 10%)的等量让利消费 e 积分和10%(指销售额的 10%)的等量让利激励 e 积分。</p>
		<p>2、“e 积分”经过一定的时间按平台规则约定的一定比例逐天转换为“享积分”。 其转换成享积分的规则如下：</p>
		<p>（1）、消费 e 积分。根据平台消费增长或下降的幅度得出当天消费分享系数（即 1‰左右），会员当天“e 积分” 实际总剩余量乘以消费分享系数”，即为当天应转换 的等量“享积分”。</p>
		<p>（2）、商家让利激励 e 积分。根据平台当天消费增减情况，计算出商家让利激励 e 积分当天的激励分享系数，得出每个商家当天应转换的等量“享积分”如下：</p>

		<p>3、让利分享资金严格专项存管与逐天分配运行。凡用于消费分享和商家让利激励 的资金严格进入银行专户，根据公司章程规定和股东会决议，任何人无权动用，只能 按规则进行分享。平台财务部门严格按要求设立特定会计科目进行核算，并严格按财 务制度进行监管与操作。平台必须建立严格的风控体系和内审制度，确保商家让利资 金严格按规则运行。</p>

			<b>五、享积分兑现与转存</b>

		<p>1、享积分兑现。会员 ID 的“享积分”随时以 100 的倍数，扣除 5%的代扣代缴税 金后，可兑现为税后享积分，平台简称为：平台资金。</p>
		<p>2、平台资金兑现转存。平台资金随时可以 100 的倍数等额兑现转存为人民币存款。 </p>转存为人民币存款须绑定会员的银行帐号或第三方支付系统帐号（目前暂不支持向第 三方支付系统帐号转存）。国内单笔转存不得超过 5 万元人民币，转存手续费每笔代
			收 5 元。</p>
	  <p>3、转存前提。会员平台资金转存必须通过银行实名认证，且存款人银行帐户的户 名必须与会员身份证姓名一致。
		<p>4、转存在途时间。平台资金转存银行为 T+2 个工作日。T 在此表示为工作日当天。</p>

			<b>六、每个环节都充分体现“三公”与“三合”的原则</b>

		<p>为了符合我国市场经济的客观要求，充分体现“公平、公正、公开”和“合理、 合法、合规”的原则，平台规则的每一个环节均与第三方携手合作或委托第三方监督 或审计。</p>
		<p>1、市场委托运营商运营管理。e 享时代的运营商为深圳易享时代运营服务有限公

			司。</p>
		<p>2、平台软件委托软件开发商开发。e 享时代的软件开发商为深圳易享时代软件科

			技有限公司。</p>
		<p>3、代理商委托运营商管理。全国各地按省市县行政区域设立三级区域代理商。</p>

		<p>4、平台资金委托开户银行专户存入，严格按平台规则使用。</p>
		<p>5、联盟商家让利资金的规范使用，委托签约第三方会计师事务所审计监督，并按 月或按季出具专项审计报告。</p>

			<b>七、特别声明</b>

		<p>本平台是一个以商业服务模式服务于所有工商业、农业、服务业企业的公司，目 的在平台简介中讲得非常明确，在此，特声明如下：</p>
		<p>1、严禁运营商、代理商、关联合作方、会员使用“全返、返利、乐返、返还……” 等诱惑性词语去误导消费者做投资性虚假消费，扰乱消费经济秩序；</p>
		<p>2、严禁联盟商家做虚假消费单套取消费让利分享资金；</p>
		<p>3、本公司丌卖股权和代理，也严禁运营商、代理商等合作方以任何名义或方式卖 股权或代理；</p>
		<p>4、本平只有一代会员消费推荐奖励，坚决反对一代以上的多级多层次推荐奖励；</p>
		<p>5、本公司的每一个环节均不第三方携手合作或委托第三方监督或审计，做到“公 平、公正、公开”和“合理、合法、合规”；</p>
		<p>6、本公司秉着公正、开放、透明的态度，承诺严格遵守国家政策和法律法规，遵
			循我国市场经济的经济规律，坚决拥护中办、国办关于《促进移动互联网健康有序发 展的意见》，愿意接受相关政府职能部门的监督和指导。</p>
		</div>

		<!-- e享时代会员服务协议（正式稿） -->
		<div class="ex-word-cnt" v-if='id=="2"'>
		<h3>“e享时代”会员服务协议</h3>
		<b>提示：</b>
		<p>您知悉并确认：在您选择同意本协议之前，本协议条款系要约，您选择同意的行为构成承诺，会产生
		本协议成立并生效的结果，您须将遵守本协议的全部规则。</p>
		<p>为了更好地支持全国各地盘活存量资源，开发增量，促进新增消费，激发经济活力，促进要素流动，
		催生新兴业态，带动扩大就业，为广大老百姓提供强大的平台资源、更低的机会成本、更多的就业渠道、
		更低的就业门槛，促进大众创业、万众创新，加速贫困地区脱贫，有效遏制返贫现象, 深圳易享时代网络
		科技有限公司（以下简称为“易享时代”或“我方”）特创立了“e 享时代创新消费商业服务平台”。</p>
		<p>（以下称“e 享时代”）。本服务协议是 e 享时代网站 www.exgj.com.cn（以下称为“本网站”）及 APP
		的经营者易享时代与会员即用户（以下称“用户”或“您”）共同缔结的对双方具有约束力的有效契约。
		e 享时代向用户提供本网站及 APP 上所展示的商品或服务（下称“e 享时代服务”、“本服务”），并将
		不断更新服务内容，最新的 e 享时代服务以本网站及 APP 上的相关商品及服务介绍的页面展示以及向用户
		实际提供的为准。</p>
		<b>1、总则</b>
		<p>1.1 易享时代会员入会自由，您确认在加入 e 享时代平台之前，已经充分阅读、理解并接受本协议的
		全部内容，一旦您选择“同意”并完成注册流程或使用本服务，即表示您同意遵循本服务协议之所有约定。
		<p>1.2 您同意易享时代有权随时对本服务协议及相应的服务规则内容进行单方面的变更，并有权以消息
		推送、网页公告等方式予以公布，而无需另行单独通知您；若您在本服务协议内容公告变更后继续使用本
		服务的，表示您已充分阅读、理解并接受修改后的协议内容，也将遵循修改后的协议内容使用本服务；若
		您不同意修改后的服务协议，您应立即停止使用本服务。</p>
		<p>1.3 您自愿成为 e 享时代会员，接受 e 享时代平台的服务。易享时代受联盟商家的委托，将商家 15%
		的消费让利按 e 享时代平台的消费赠送和让利赠送的积分规则，对您及其它关联方提供积分管理服务。双
		方根据有关法律法规之规定, 秉着互惠互利、共同发展、公平合理的原则达成本协议，以示遵守。</p>
		<b>2、注册、帐户和实名认证</b>
		<p>2.1 在您按照注册页面提示填写信息、阅读并同意本服务协议且完成全部注册程序后，您即已获得 e
		享时代会员帐户，正式成为 e 享时代免费体验会员。您可以使用您提供或确认的手机号码或您的用户名作
		为登录手段进入本网站；</p>
		<p>2.2 若因您提供的注册信息不准确，导致您在使用 e 享时代服务过程中产生任何损失或增加费用，应
		由您完全独自承担。</p>
		<p>2.3 您了解并同意，为保证帐户和交易安全，我方有权随时要求您完成 e 享时代帐户的资料修改和实
		名认证。</p>
		<b>3、 帐户安全</b>
		<p>3.1 您须自行负责对您的 e 享时代帐户和密码保密，且须对您在该登录名和密码下发生的所有活动

		（包括但不限于信息披露、发布信息、网上点击同意或提交各类规则协议、网上续签协议或购买服务等）
		承担责任。您同意：(a)如发现任何人未经授权使用您的 e 享时代帐户和密码，或发生违反保密规定的任
		何其他情况，您会立即通知易享时代；及(b)确保您在每个上网时段结束时，以正确步骤离开网站。易享
		时代不能也不会对因您未能遵守本款规定而发生的任何损失或损毁负责。您理解易享时代对您的请求采取
		行动需要合理时间，易享时代对采取行动前已经产生的后果（包括但不限于您的任何损失）不承担任何责
		任。</p>
		<p>3.2 您理解并同意，我方有权了解您使用本网站产品及服务的真实背景及目的，有权要求您如实提供
		真实、全面、准确的信息；如果我方有合理理由怀疑您提供的信息不真实、您进行虚假交易，或您的行为
		违反 e 享时代网站规则的，易享时代有权暂时或永久限制您帐户下所使用的所有产品及/或服务的部分或
		全部功能。</p>
		<p>3.3 您理解并同意，基于运行和交易安全的需要，易享时代有权暂时停止或者限制您账号下部分或全
		部 e 享时代会员“享积分”的兑换申请，易享时代将通过邮件、站内信息、短信或电话等方式通知您，您
		应及时予以关注并按照程序进行申诉等后续操作。</p>
		<p>3.4 您理解并同意，易享时代有权按照国家司法、行政、军事、安全等机关（包括但不限于公安机关、
		检察机关、法院、海关、税务机关、安全部门等）的要求对您的个人信息及个人帐户的 e 享时代会员积分、
		交易及帐户等进行查询、冻结或扣划。</p>
		<p>3.5 保密协议：1）您同意在合作过程中涉及的所有秘密信息，任何一方未经商业秘密提供方同意，均
		不得将该信息向任何第三方披露、传播、编辑或展示。 2） 因对方书面同意以及国家行政、司法强制行
		为而披露商业秘密的，披露方不承担责任；该商业秘密已为公众所知悉的，披露方不承担责任。</p>
		<p>3.6 会员帐户注销</p>
		<p>3.6.1 易享时代保留在您违反国家、地方法律法规规定或违反本服务协议的情况下，中止或终止为您
		提供部分或全部服务、直至注销 e享时代帐户的权利。</p>
		<p>3.6.2 您同意并授权 e 享时代网站，如您在 e 享时代网站有欺诈、发布或销售伪劣商品、侵犯他人合
		法权益或其他严重违反任一 e 享时代网站规则的行为，您的 e 享时代登录名可能被注销，被注销后您不能
		再登录 e享时代网站，e享时代网站服务同时终止。</p>
		<p>3.6.3 您保证不会采取任何影响、损害或可能影响、损害易享时代及其关联公司、网站的合法权益，
		前述影响或损害易享时代及关联公司、网站合法权益的行为或方式包括但不限于：</p>
		<p>3.6.3.1 违反易享时代及其关联公司公布的任何服务协议/协议、管理规范、交易规则等规范内容；
		<p>3.6.3.2 破坏或试图破坏 e享时代网站、易享时代及其关联公司公平交易环境或正常交易秩序；
		<p>3.6.3.3 任何使用含有易享时代名称、e 享时代品牌且对他人有误导嫌疑或任何使用某种中英文(全称
		或简称)、数字、域名等意图表示或映射与易享时代公司、e享时代具有某种关系的；</p>
		<p>3.6.3.4 e 享时代根据自行合理判断，认为可能是与如上行为性质相同或产生如上类似风险的其他情
		况。 您认可易享时代有权在您违反上述约定时有权终止向您提供服务，即您将不能再登录 e 享时代网站，
		即网站服务将同时终止。</p>

		<p>3.6.4 e享时代会员退会自由。您理解并同意，您随时可以自由退出易享时代会员，易享 VIP 会员退
		会时不退 VIP会员费。从您退会之时起，您将不能再登录 e享时代网站，即网站服务将同时终止。</p>
		<b>4、 积分转换赠送返还与激励赠送返还方式</b>
		<p>4.1、您自愿加盟 e 享时代平台，成为 e 享时代 e 享时代会员，并享有 e 享时代会员的各项权益并遵
		守相应的义务。</p>
		<p>4.2、您在我方联盟商家消费时，主动提交消费数据给联盟商家，以便我方及时获得消费数据。
		<p>4.3、我方受联盟商家的委托，将收到的商家让利部分对所有 e 享时代会员及关联方进行积分转换赠
		送返还与激励赠送返还方式，具体规则如下：</p>
		<p>4.3.1 联盟商家的让利比例为 15%；</p>
		<p>4.3.2 当您在 e 享时代联盟商家的消费每满 100 元整数时，即为 e 享时代赠送的的一个消费 e 积分单
		元，将按照平台规则获得消费分享让利金每天 1‰左右的 e 积分转换为享积分，直至该 e 积分单元转换完
		毕为止。</p>
		<p>4.3.3 联盟商家让利的 15%将获得 20%的赠送 e 积分（其中 5%属于商家的让利奖励），其中 10%获得
		消费分享让利金每天 1‰左右的 e 积分转换为享积分，另外面 10%将获得激励分享让利金每天 2%左右的 e
		积分转换为享积分。所谓 2%左右是通过公式（即：当日联盟商家让利销售总额×4%÷〈剩余让利激励 e 积
		分单元数+当日新增让利激励 e积分单元数〉）计算的结果。</p>
		<b>5、 本网站服务使用规则为有效保障您使用本服务的合法权益，您理解并同意接受以下规则：</b>
		<p>5.1 您通过包括但不限于以下方式向 e 享时代发出的指令，均视为您本人的指令，不可撤回或撤销，
		您应自行对 e享时代执行前述指令所产生的任何结果承担责任。</p>
		<p>5.1.1 通过您的 e享时代帐户和密码进行的所有操作；</p>
		<p>5.1.2 通过与您的账号绑定的手机号码向 e享时代发送的全部信息；</p>
		<p>5.1.3 其他易享时代与您约定或易享时代认可的其他方式。</p>
		<p>5.2 您在使用本服务过程中，本服务协议内容、页面上出现的关于交易操作的提示或易享时代发送
		到您手机的信息（短信或电话等）内容是您使用本服务的相关规则，您了解并同意易享时代有权单方修改
		服务的相关规则，而无须征得您的同意。</p>
		<p>5.2.1 e 享时代会员“e 积分”从消费之日起必须经过消费审核、让利审核、e 积分到帐审核各一天
		共三天时间（即 T+3 日），平台赠送的 e 积分才能到达会员的帐户上。 “e 积分” 从到达会员的帐上之
		日起开始逐天按平台规则转换成“享积分”，“享积分”必须达到 100（即等值于人民币 100 元）的整倍
		数时才能兑换为平台资金，然后才能兑现转存银行，我方将按 T+2 个工作日转入您的绑定银行帐户。“享
		积分”所涉及的银行转存手续费及相对应的应缴税金由您方承担，并由我方代扣代缴。</p>
		<p>5.3 e 享时代在服务过程中,您应当及时登录到本网站查看和进行交易操作。因您没有及时查看和对
		服务状态进行修改或确认或未能提交相关申请而导致的任何纠纷或损失，易享时代不负任何责任。</p>
		<p>5.4 您授权易享时代可以通过向第三方区域运营中心代理审核您的身份和资格，取得您使用本服务
		的相关资料。</p>

		<p>5.5 申诉及处理</p>
		<p>5.5.1 在您使用 e 享时代服务的过程中，有可能因为违反本服务协议相关要求而被易享时代采取了包
		括但不限于停止全部或部分服务、限制服务的全部或部分功能、冻结全部或部分帐户积分或资金等措施，
		易享时代将通过邮件、站内信息、短信或电话等方式通知您按照相应的程序进行申诉。</p>
		<p>5.5.2 您通过申诉程序，向易享时代申请解除上述限制或冻结或恢复服务的，应按照易享时代的要求，
		如实提供身份证明及相关资料，以及易享时代要求的其他信息或文件，以便我方进行核实。我方有权依照
		自行判断来决定是否同意您的申诉请求。</p>
		<p>5.5.3 您理解并同意，如果您拒绝如实提供身份证明及相关资料的，或未能通过我方审核的，我方有
		权长期冻结该等帐户且长期限制该等产品或者服务的部分或全部功能。</p>
		<b>6、您的权利和义务</b>
		<p>6.1 您有权利享受我方提供的互联网技术和信息服务，并有权利在接受我方提供的服务时获得技术支
		持、咨询等服务，服务内容详见相关资料及本网站相关产品介绍。</p>
		<p>6.2 您保证不会利用技术或其他手段破坏或扰乱本网站。</p>
		<p>6.3 您应尊重我方及其他第三方的知识产权和其他合法权利，并保证在发生侵犯上述权益的违法事件
		时尽力保护易享时代及其股东、雇员、合作伙伴等免于因该等事件受到影响或损失；我方保留您侵犯易享
		时代合法权益时终止向您提供服务并不退还任何款项的权利。</p>
		<p>6.4 对由于您向我方提供的联络方式有误以及您用于接受我方邮件的电子邮箱安全性、稳定性不佳而
		导致的一切后果，您应自行承担责任，包括但不限于因您未能及时收到我方的相关通知而导致的后果和损
		失。</p>
		<p>6.5 您使用我方产品或服务时将遵从国家、地方法律法规、行业惯例和社会公共道德，不会利用我方
		提供的服务进行存储、发布、传播如下信息和内容：违反国家法律法规政策的任何内容（信息）；违反国
		家规定的政治宣传和/或新闻信息；涉及国家秘密和/或安全的信息；封建迷信和/或淫秽、色情、下流的
		信息或教唆犯罪的信息；博彩有奖、赌博游戏；违反国家民族和宗教政策的信息；妨碍互联网运行安全的
		信息；侵害他人合法权益的信息和/或其他有损于社会秩序、社会治安、公共道德的信息或内容;您同时承
		诺不得为他人发布上述不符合国家规定和/或本服务协议约定的信息内容提供任何便利，包括但不限于设
		置 URL、BANNER链接等; 如因您违反上述行为给易享时代造成损失的，您应予赔偿。</p>
		<b>7、易享时代的权利和义务</b>
		<p>7.1 我方承诺对您的资料采取对外保密措施，不向第三方披露您的资料，不授权第三方使用您的资料，
		除非：</p>
		<p>7.1.1 依据本服务协议或者您与易享时代之间其他服务协议、合同、在线协议等规定可以提供；</p>
		<p>7.1.2 依据法律法规的规定应当提供；</p>
		<p>7.1.3 行政、司法等职权部门要求我方提供；</p>
		<p>7.1.4 您同意我方向第三方提供；</p>
		<p>7.1.5 我方为解决举报事件、提起诉讼而提交的；</p>

		<p>7.1.6 我方为防止严重违法行为或涉嫌犯罪行为发生而采取必要合理行动所必须提交的；</p>
		<p>7.1.7 我方为了向您提供产品、服务、信息而向第三方提供的，包括我方须通过第三方的技术及服务
		向您提供产品、服务、信息的情况。</p>
		<p>7.2 我方有权根据本服务协议的约定，根据您的服务使用情况，自您的帐户余额中直接扣除相关服务
		费用。</p>
		<p>7.3 当存在如下情形之一时，我方有权对您名下帐户 e享时代会员积分的部分或全部进行冻结：</p>
		<p>7.3.1 国家法律、法规、政策、法律文书的规定：</p>
		<p>7.3.2 国家有权机关要求进行冻结的：</p>
		<p>7.3.3 您使用 e享时代服务的行为涉嫌违反国家法律法规及行政规定的；</p>
		<p>7.3.4 我方基于单方面合理判断，认为您的帐户操作、资金进出等存在异常时；或认为可能产生风险
		的其他情况。</p>
		<p>7.3.5 他人向您帐户错误汇入 e享时代会员积分等导致您可能存在不当得利的；</p>
		<p>7.3.6 您与第三方有书面协议约定或遭到他人投诉，且对方已经提供了一定证据的；</p>
		<p>7.3.7 有证据证明您在联盟商家录入的消费数据是假消费，并没有产生真实的消费时。 我方按照前
		述规定对您的帐户 e 享时代会员积分进行冻结后，将通过邮件、站内信息、短信或电话等方式通知您按照
		相应的程序进行申诉。如果您按照本服务协议的要求进行申诉并经我方审核通过的，将立即解除 e 享时代
		会员积分冻结措施；如果您未在规定时间内进行申请，或您的申诉未能通过我方审核的，则您确认我方有
		权长期冻结该帐户，或将相关冻结款项捐赠给 e享时代的公益基金。</p>
		<b>8、隐私及其他个人信息的保护一旦您同意本服务协议或使用本服务，您即同意我方按照以下协议来
		使用和披露您的个人信息。</b>
		<p>8.1 登录名和密码。在您注册帐户时，e 享时代会要求您设置 e 享时代帐户登录名和密码来识别您的
		身份。您仅可通过您设置的密码来使用该帐户，如果您泄漏了密码，您可能会丢失您的个人识别信息，并
		可能导致对您不利的法律后果。该帐户和密码因任何原因受到潜在或现实危险时，您应该立即和我方取得
		联系，在我方采取行动前所造成的损失我方对此不负任何责任。</p>
		<p>8.2 银行帐户信息。若我方所提供的服务需要您提供您的银行帐户信息，在您提供相应信息后，我方
		将严格履行相关保密约定。</p>
		<p>8.3 登录记录。为了保障您使用本服务的安全以及不断改进服务质量，e 享时代将记录并保存您登录
		和使用本服务的相关信息，但我方承诺不将此类信息提供给任何第三方（除双方另有约定或法律法规另有
		规定及我方关联公司外）。</p>
		<p>8.4 广告。我方会对 e享时代用户的身份数据进行综合统计，并出于销售和奖励的需要使用或披露。
		<p>8.5 外部链接。本网站如果含有到其他网站的链接，我方对其他网站的隐私保护措施不负任何责任。
		我方可能在任何需要的时候增加商业伙伴或共用品牌的网站。</p>
		<p>8.6 安全。我方仅按现有技术提供相应的安全措施来使 e 享时代网站掌握的信息不丢失，不被滥用和
		变造。这些安全措施包括向其他服务器备份数据和对用户密码加密。尽管有这些安全措施，但我方不保证这些信息的绝对安全。</p>
		<p>8.7 用户信息。您完成帐户注册或激活帐户时，应向 e 享时代网站提供您的真实姓名、地址、电话号 码和电子邮件地址，您还可以选择来填写相关附加信息（包括但不限于您所在的省份和城市、邮政编码、 个人照片等）。您同意本协议时您即表明同意 e 享时代及其服务商和推广中心为运作本服务而收集、使用 和/或披露和互相分享您的个人资料，并将这些个人信息披露给授权服务提供商和相关第三方。</p>
		<p>8.8 您进一步同意易享时代：</p>
		<p>8.8.1 向您发送定制化的信息或新产品/服务信息，通过电邮、电话（包括语音电话、传真或信息， 如果您表明我们可以以此方式联系您）；</p>
		<p>8.8.2 出于为您提供增强或分析的统计功能使用您的个人信息，或者出于销售或鼓励的目的使用或披 露个人信息。</p>
		<b>9、系统中断或故障系统可能因下列状况无法正常运作，使您无法使用各项互联网服务时，我方不承 担损害赔偿责任，该状况包括但不限于：</b>
		<p>9.1 我方网站在系统停机维护期间。</p>
		<p>9.2 电信设备出现故障不能进行数据传输的。</p>
		<p>9.3 因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可抗力之因素，造成 e 享时代系统障碍 不能执行业务的。</p>
		<p>9.4 由于黑客攻击、电信部门技术调整或故障、网站升级、银行方面的问题等原因而造成的服务中断 或者延迟。</p>
		<b>10、责任范围及责任限制</b>
		<p>10.1 我方仅对本服务协议中列明的责任承担范围负责。</p>
		<p>10.2 本服务之合作单位所提供之服务品质及内容由该合作单位自行负责，我方不承担任何责任。</p>
		<p>10.3 您了解并同意，因您使用本服务、违反本服务协议或在您的帐户下采取的任何行动，而导致的 任何第三方索赔，仅应由您本人承担。如果由此引起易享时代及其关联公司、员工、客户和合作伙伴被第 三方索赔的，您应负责处理，并承担由此造成的全部责任。</p>
		<p>10.4 在法律允许的情况下，易享时代对于与本服务协议有关或由本服务协议引起的任何间接的、惩 罚性的、特殊的、派生的损失，不论是如何产生的，也不论是由对本服务协议的违约（包括违反保证）还 是由侵权造成的，均不负有任何责任，即使事先已被告知此等损失的可能性。另外即使本服务协议规定的 排他性救济没有达到其基本目的，也应排除易享时代对上述损失的责任。</p>
		<b>11、完整协议</b>
		<p><p>11.1 本服务协议由本服务协议与本网站公示的各项规则组成，相关名词可互相引用参照，如有不同 理解，以本服务协议为准。</p>
		<p>11.2 本服务协议的章节标题仅为行文方便而设，不具有法律或合同效力。</p>
		<p>11.3 您对本服务协议理解和认同，您即对本服务协议所有组成部分的内容理解并认同，一旦您使用 本服务，您和易享时代即受本服务协议所有组成部分的约束。</p>

		<p>11.4 本服务协议部分内容被有管辖权的法院认定为违法的，不因此影响其他内容的效力。</p>
		<b>12、商标、知识产权的保护</b>
		<p>12.1 除第三方产品或服务外，本网站上所有内容，包括但不限于著作、图片、档案、资讯、资料、 架构、页面设计，均由易享时代或其关联企业依法拥有其知识产权，包括但不限于商标权、专利权、著作 权、商业秘密等。</p>
		<p>12.2 非经易享时代书面同意，任何人不得擅自使用、修改、复制、公开传播、改变、散布、发行或 公开发表本网站上程序或内容。</p>
		<p>12.3 尊重知识产权是您应尽的义务，如有违反，您应承担损害赔偿责任。</p>
		<b>13、法律适用与管辖</b>
		<p>13.1 本服务协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律。</p>
		<p>13.2 双方因履行本合同产生争议的，应友好协商解决，协商不成提交深圳国际仲裁院仲裁，仲裁采 用简易程序。</p>
		<p>13.3 甲乙双方同意，与本协议有关的任何通知，以书面方式送达方为有效。书面形式包括但不限于： 快递、邮件、电子邮件。上述通知应被视为在下列时间送达：以电子邮件形式发出的，自电子邮件进入对 方邮件系统之时，视为通知到达；以快递/书面邮件形式发出的，自对方签收之日或快递发出之日起 5 日 内视为通知到达。</p>
		<b>14、本服务协议相关文字的定义</b>
		<p>14.1 e 享时代平台，是指 e 享时代网站和 APP 系统及其它关联部分（简称“平台”）；</p>
		<p>14.2 e 享时代会员：是指在 e 享时代网站或 APP 系统注册的 e 享时代会员；</p>
		<p>14.3 e 享时代会员推荐人：是指 e 享时代会员的介绍人，其提供了本人的二维码让 e 享时代会员扫描；
		<p>14.4 积分转换赠送返还或激励：是指商家的消费让利资金委托 e 享时代平台对 e 享时代会员及关联 方进行的积分管理及分配。</p>
		<p>14.5 运营中心区域代理：是指从 e 享时代获得运营管理权限，代表 e 享时代对会员、商家进行监管、 服务的公司及其代表。</p>
		<p>14.6 e 享时代会员的 e 积分：e 积分是指消费者与商家通过 e 享时代平台的消费或商家让利获得的赠 送积分计算单位，1 元人民币消费等同于 1 个 e 积分。</p>
		<p>14.7 e 积分单元：100 元人民币消费等同于 1 个单元的 e 积分。</p>
		<p>14.8 e 享时代会员的享积分： e 积分每天按规则等量转换为享积分，享积分可以用于兑换平台联盟 商家的商品或服务，也可随时按 100 的整倍数申请兑换为平台资金，平台代扣代缴相应税款后，可随时按
		100 的整倍数兑现转存会员个人的银行帐户。</p>
		<p>14.9 T+：“T”在平台有两层意思，一是在商家报单销售时，T 表示顺延的日历日期；二是在会员兑 现转存个人银行帐号时，T 表示为国家规定的法定工作日。</p>
		<p>14.10 易享时代对本协议拥有最终解释权，本协议与 e 享时代平台规则不一致的，以平台规则为准。</p>
		</div>
	

		<!-- e享时代联盟商家承诺书 -->
		<div class="ex-word-cnt" v-if='id=="3"'>
			<h3>e 享时代商业服务平台联盟商家承诺书</h3>
			深圳易享时代网络科技有限公司：
			<p>1、我公司自愿加入 e享时代互联网+创新消费商业服务平台线上线下联盟
			商城，成为 e享时代联盟商家，自愿安装 e享时代终端信息读取系统。</p>
			<p>2、根据 e享时代平台赠送消费返还与商家激励的机制，我公司在 e享时代
			联盟商城销售的商品自愿让利 15%给贵平台。</p>
			<p>3、同时我公司郑重承诺：</p>
			<p>（1）、在系统注册时提交的资料是真实且合法的；</p>
			<p>（2）、不会对 e享时代会员销售假冒伪劣商品；</p>
			<p>（3）、不会对 e享时代会员出现虚抬物价行为；</p>
			<p>（4）、不会在 e享时代平台做出虚假消费行为；</p>
			<p>（5）、不会对 e享时代平台做出误导及虚假传播行为；</p>
			<p>（6）、不会违反合同约定迟延支付或止付约定让利款的行为。</p>
			<p>本公司若违反以上行为之一，经 e享时代运营中心与区域所属运营代理中
			心共同核查确认，并经 e享时代运营中心两次警告后依然没有按期纠正的，e
			享时代运营中心将根据合作/协议约定及相关规定，有权对本承诺方进行处罚,
			相应的处罚措施包括“黑名单公布”、“停止赠送让利返还与激励”、“终止
			后台服务号”、 “终止合作”等措施；若因此而引起的违法行为，e享时代运
			营中心保留向相关政府部门举报并配合相关政府部门追究其法律责任的权利。
			本《承诺书》一式肆份, e享时代运营中心、e享时代当地区域运营代理中
			心、承诺方各执一份。</p>
			<p class="right">承诺方（公章）：</p>
			<p class="right">承诺方法定代表人或负责人（签名）：</p>
			<p class="right">签订日期：</p>
			<p class="right">签订地点：</p>
		</div>

	
	 <!-- e享时代商家入驻加盟协议书(正式稿) -->
	<div class="ex-word-cnt" v-if='id=="4"'>
		<h3>“e 享时代”创新消费商业服务平台商家入驻加盟协议书</h3>
		<b>提示：</b>
		<p>您知悉并确认：在您选择同意本协议之前，本协议条款系要约，您选择同意的
		行为构成承诺，会产生本协议成立并生效的结果，您须将遵守本协议的全部规则。</p>
		<p>本服务协议是“e享时代”创新消费商业服务平台（以下称为“本平台”）的
		经营者深圳易享时代网络科技有限公司（以下简称为“易享时代”或“e享时代”
		或“我方”）与用户（下称为“您”）共同缔结的对双方具有法律约束力的契约。</p>
		<p>e享时代向用户提供本平台上所展示的产品与服务（下称“e享时代服务”或
		“本服务”），并将不断更新服务内容，最新的 e享时代服务以本平台上的相关商
		品或服务介绍的页面展示以及向用户实际提供的商品或服务为准。</p>
		<b>1、总则</b> 
		<p>1.1 您确认在入驻本平台之前，您已经是 e 享时代消费联盟的会员，并已充
		分阅读、理解并接受本协议的全部内容，一旦您选择“同意”并提交申请或使用本
		服务，即表示您同意遵循本服务协议之所有约定。</p>
		<p>1.2 您同意本平台有权随时对本服务协议及相应的服务规则内容进行单方面
		的变更，并有权以消息推送、网页公告等方式予以公布，而无需另行单独通知您；
		若您在本服务协议内容公告变更后继续使用本服务的，表示您已充分阅读、理解并
		接受修改后的协议内容，也将遵循修改后的协议内容使用本服务；若您不同意修改
		后的服务协议，您应立即停止使用本服务。</p>
		<p>1.3 您知悉本平台是为推动 e 享时代创新消费商业服务平台在全国范围内快
		速发展，更好地为 e 享时代联盟商家服务而成立的线上展示平台。本平台仅为商家
		的商品提供展示机会，e 享时代会员可在联盟商家完成意向订单（本平台暂不提供
		线上交易及其线上支付）。</p>
		<b>2、申请</b>
		<p>2.1 申请者属于经工商部门注册登记的合法商家，已提交商家加盟入驻申请
		的相关资料和《e 享时代商业服务平台联盟商家承诺书》，并自愿按要求提供相应
		的产品图片及相应的文字介绍。</p>
		<p>2.2 账户安全</p>
		<p>2.2.1 审核通过后，您即开通本平台的商家账户，您在本平台的商家账户即
		为您的 e 享时代商家会员账户。您须对该账户和密码妥善保密，且须对您在该登录

		名和密码下发生的所有活动（包括但不限于信息披露、发布信息、网上点击同意或
		提交各类规则协议、网上续签协议或购买服务等）承担责任。您同意：(a)如发现
		任何人未经授权使用您的平台账户和密码，或发生违反保密规定的任何其他情况，
		您会立即通知本平台；(b)确保您在每个上网时段结束时，以正确步骤离开平台。
		本平台不能也不会对因您未能遵守本款规定而发生的任何损失或损毁负责。您理解
		本平台对您的请求实行操作的过程需要合理的时间，本平台对这个过程所需要的合
		理时间之前已经产生的后果（包括但不限于您的任何损失）不承担任何责任。</p>
		<p>2.2.2 除非有法律规定或司法裁定，且征得本平台的同意，否则，您的 e 享
		时代网上联盟平台登录和密码不得以任何方式转让、赠与或继承（与账户相关的财
		产权益除外）。</p>
		<p>2.2.3 您理解并同意：我方有权了解您使用本平台产品及服务的真实背景及
		目的，有权要求您如实提供真实、全面、准确的信息；如果我方有合理理由怀疑您
		提供的信息不真实、您进行虚假交易，或您的行为违反本平台的规则，本平台有权
		暂时或永久限制您账户下所使用的所有产品或服务的部分或全部功能。</p>
		<p>2.2.4 您理解并同意，本平台有权按照国家司法、行政、军事、安全等机关
		（包括但不限于公安机关、检察机关、法院、海关、税务机关、安全部门等）的要
		求对您的个人信息及在本平台的资金、交易及账户等进行查询、冻结或扣划。</p>
		<p>2.2.6 保密协议</p>
		<p>1）您同意在合作过程中涉及的所有秘密信息，任何一方未经商业秘密提供方
		的同意，均不得将该信息向任何第三方披露、传播、编辑或展示。</p>
		<p>2）因对方书面同意以及国家行政、司法强制行为而披露商业秘密的，披露方
		不承担责任；该商业秘密已为公众所知悉的，披露方不承担责任。</p>
		<p>2.3 账户注销</p>
		<p>2.3.1 本平台保留在您违反国家、地方法律法规规定或违反本服务协议的情
		况下，中止或终止为您提供部分或全部服务、直至注销平台账户的权利。</p>
		<p>2.3.2 登录名的注销</p>
		<p>2.3.2.1 您理解并同意，如您连续 12 个月未使用您的邮箱、手机或本平台认
		可的其他方式和密码登录过本平台，且您的账户下不存在任何未到期的服务，本平
		台有权注销您的登录名，您将不能再登录本平台。</p>
		<p>2.3.2.2 您同意并授权本平台，如您在本平台有欺诈、发布或销售伪劣商品、
		侵犯他人合法权益或其他严重违反任一本平台规则的行为，您的登录名可能被注销，
		被注销后您不能再登录本平台，本平台提供的服务同时终止。</p>

		<p>2.3.3 您保证不会采取任何影响、损害或可能影响、损害 e享时代及其关联
		公司、平台的合法权益。前述影响或损害 e享时代及其关联公司、平台合法权益的
		行为或方式包括但不限于：</p>
		<p>2.3.3.1 违反 e 享时代及其关联公司公布的任何服务协议/协议、管理规范、
		交易规则等规范内容；</p>
		<p>2.3.3.2 破坏或试图破坏 e 享时代及其关联公司公平交易环境或正常交易秩
		序；</p>
		<p>2.3.3.3 任何使用含有易享时代名称、e 享时代品牌/系列品牌且对他人有误
		导嫌疑或任何使用某种中英文(全称或简称)、数字、域名等意图表示或映射与易享
		时代、e享时代具有某种关系的；</p>
		<p>2.3.3.4 e享时代根据自行合理判断，认为可能是与以上行为性质相同或产生
		以上类似风险的其他情况。您认可 e 享时代有权在您违反上述约定时有权终止向您
		提供服务，所有本平台的服务将同时终止。</p>
		<p>2.4 合作方式</p>
		<p>2.4.1、您自愿申请并入驻 e 享时代网上联盟平台，入驻后享有本平台的各项
		权益并遵守相应的义务。</p>
		<p>2.4.2、您知悉并接受本平台共享经济、分享消费的创新消费理念及平台规则，
		您委托我方按本平台的销售让利方式与销售让利计算办法给 e 享时代会员及关联方
		进行消费让利，我方向您提供相应的联盟服务。</p>
		<b>3、平台服务使用守则</b>
		<p>为有效保障您使用本服务的合法权益，您理解并同意接受以下规则：</p>
		<p>3.1 您通过包括但不限于以下方式向本平台发出的指令，均视为您本人的指
		令，不可撤回或撤销，您应自行对本平台执行前述指令所产生的任何结果承担责任。</p>
		<p>3.1.1 通过您的 e享时代会员账户和密码进行的所有操作；</p>
		<p>3.1.2 通过与您的账号绑定的手机号码向 e享时代发送的全部信息；</p>
		<p>3.1.3 通过与您的账号绑定的其他硬件、终端、软件、代号、编码、代码、
		其他账户名等有形体或无形体向 e享时代发送的信息；</p>
		<p>3.1.4 e 享时代委托您当地的 e 享时代运营中心代理公司与您约定，或 e 享
		时代认可的其他方式。</p>
		<p>3.2 您在使用本服务过程中，本服务协议内容、页面上出现的关于交易操作
		的提示或 e 享时代发送到您手机的信息（短信或电话等）内容是您使用本服务的相
		关规则，您使用本服务即表示您同意接受本服务的相关规则。您了解并同 意 e 享

		时代有权单方修改服务的相关规则，而无须征得您的同意，服务规则应以您使用服
		务时的页面提示（或发送到该手机的短信或电话等）为准，您同意并遵照服务规则
		是您使用本服务的前提。</p>
		<p>3.2.1 让利款委托</p>
		<p>1）您委托我方平台分配的每天销售让利金额将于次日起两天内在规定的截止
		时间点（暂定为下午四点，如有变动将另行通知）之前足额向我方转账，让利款
		到账视为收讫。</p>
		<p>2）当您对 e 享时代会员享积分进行申请兑换时，我方按 T+2 个工作日转入
		您绑定的银行帐户，其所涉及的相关税费和转存手续费由您承担。</p>
		<p>3)、我方收款账号户名：深圳易享时代网络科技有限公司，开户银行:中国农
		业银行深圳凤凰支行，账号：4103-3100-0400-2529-7
		 我方帐户户名、开户银行与帐号如有任何变更或调整，将会以各种快捷方式告
		之，请您注意查收。</p>
		<p>3.2.2 违约责任</p>
		<p>3.2.2.1、您未及时按约定向我方支付该款项的，应按下列方式承担违约责任。
		<p>1）当您连续 3 个工作日未把销售让利资金汇入我方（非营业时间除外），
		我方有权暂停系统交易；您应在暂停系统交易以后的 3 个工作日内向我方支付
		上述款项，否则我方有权解除合作并追究您的违约责任。</p>
		<p>2）因您出现上述违约行为导致本协议解除的，您除应支付上述欠款外，须另
		行赔偿我方的损失（包括但不限于我方为追讨您上述赔偿款项所支付的律师费、鉴
		定费、诉讼费等合理费用）。</p>
		<p>3）因各种原因导致双方合作终止后，未经我方许可，您继续使用授权牌和系
		统的，我方有权要求立即停止侵权行为，并要求您承担让利总额 20%的违约金，
		违约金不足以赔偿我方损失的，您应向我方进行足额赔偿。</p>
		<p>4）您违反本协议约定的义务、承诺或保证的，我方有权单方解除本协议，并
		要求您承担 e 享时代会员消费尚未开始获得消费积分总数额的 15%作为违约金，
		违约金不足以赔偿我方损失（包括但不限于诉讼费、律师费、评估费、鉴定费、翻
		译费等）的，您应向我方进行足额赔偿。</p>
		<p>3.3 e享时代可能会以电子邮件（或发送到您手机的短信或电话等）方式通知
		您服务进展情况以及提示您进行下一步的操作，但 e 享时代不保证您能够收到或者
		及时收到该邮件（或发送到该手机的短信或电话等），且不对此承担任何后果。因
		此，在服务过程中您应当及时登录到本平台查看和进行交易操作。因您没有及时查

		看和对服务状态进行修改或确认或未能提交相关申请而导致的任何纠纷或损失，e
		享时代不负任何责任。</p>
		<p>3.4 您授权 e 享时代可以通过向第三方审核您的身份和资格，取得您使用本
		服务的相关资料。</p>
		<p>3.5 在您使用 e 享时代服务时，e 享时代有权依照相应的产品/及或服务收费
		介绍、订单及/或相关协议向您收取服务费用。e 享时代拥有制订及调整服务费之
		权利，具体服务费用以您使用本服务时平台上所公告或您与 e 享时代达成的其他书
		面协议为准。</p>
		<p>3.6 申诉及处理</p>
		<p>3.6.1 在您使用 e 享时代服务的过程中，有可能因为存在本服务协议第 5.4
		条所列情形之一，而被 e 享时代采取了包括但不限于停止全部或部分服务、限制服
		务的全部或部分功能、冻结全部或部分账户资金等措施，e 享时代将通过邮件、站
		内信、短信或电话等方式通知您按照相应的程序进行申诉。</p>
		<p>3.6.2 您通过申诉程序，向 e 享时代申请解除上述限制或冻结或恢复服务的，
		应按照 e享时代的要求，如实提供身份证明及相关资料，以及 e享时代要求的其他
		信息或文件，以便我方进行核实。您应充分理解您的申诉并不必然被允许，我方有
		权依照自行判断来决定是否同意您的申诉请求。</p>
		<p>3.6.3 您理解并同意，如果您拒绝如实提供身份证明及相关资料的，或未能
		通过我方审核的，我方有权长期冻结该等账户且长期限制该等商品或者服务的部分
		或全部功能。</p>
		<p>3.7 如果您通过使用本服务，将获取使用来自第三方的任何商品或服务，您
		还可能受限于该等第三方的相关协议和条件，我方对此不予过问亦不承担任何责任，
		本服务协议不影响您与该第三方的法律关系。</p>
		<p>3.7.1 除明确约定外，其他约定并不构成任何商业代理、授权或许可。双方
		均保证，未经对方书面同意，任一方都不得擅自声称与对方的代理或授权许可有关
		系，也不得使用对方的名称、商标、标识、LOGO 等资料开展市场推广或广告宣传
		活动，如其中一方同意提供市场推广、广告宣传等相关材料，另一方应基于本协议
		的目的在有限范围使用，不得将其用于其他任何用途。</p>
		<p>3.7.2 您承诺对所提供的商品能够依法自由流通并具有完整的所有权，有权
		供应给我方，任何第三方对商品不拥有抵押权、担保权利或其他任何权利。您承诺
		接受我方对您出售商品是否具有合法进货来源的不定期检查，并有义务保留其商品
		具有合法进货来源的相关凭证。对于无法提供合法进货来源凭证的，我方将根据实际情况对商品的真伪做出判断并根据本协议以及联盟相关规则进行处理，您对此承 担举证不利的后果。</p>
		<p>3.7.3 您承诺发布于平台的所有信息真实、准确，符合相关法律法规及 e 享 时代商业联盟规则。发布于平台或与平台有关联的交易信息中所涉商品或服务有合 法的销售权、经营许可权，对平台 e 享时代会员出售商品或服务，有义务按照买家 实际支付的现金金额为买家开具正规有效票据，相关税收应按国家相关规定由您自 行承担。您保证在进行交易的过程中遵守诚实信用的原则，不在交易过程中采取不 正当竞争行为。</p>
		<p>3.7.4 您承诺不在发布的商品中使用任何未获授权品牌的关键字。您保证其 商品（含商标、专利、包装、标识及宣传材料等）不侵犯任何第三方的知识产权。 对因您提供商品侵犯第三方的知识产权而引起的任何针对我方的索赔，您应为我方 抗辩，或在我方的要求下合作抗辩，保障我方的利益不受损害并赔偿我方因此而支 出的费用（包括诉讼费、律师费和应诉人员差旅费等）。在前述索赔已经发生或可 能发生时，您应自行支付费用并承担以下责任：（1）使我方得到继续使用符合本 合同的商品的权利，或修改商品使其不侵权并符合本合同，或用不侵权且符合本合 同的商品替换该商品；（2）我方可选择无条件退货；（3）如我方因此产生的所有 赔偿费用或其它经济损失，均由您全额承担。如果双方签署本合同时您拥有某种资 格或许可（如某品牌的经销代理授权等），一旦该资格或许可失效或过期而您未能 在合理期限内重新获取，则我方有权随时解除合同而不承担任何责任。如因该资格 或许可的丧失导致我方遭受损失的，您承担赔偿责任。</p>
		<b>4、您的权利和义务</b>
		<p>4.1.1 您有权利享受我方提供的互联网技术和信息服务，并有权利在接受我 方提供的服务时获得技术支持、咨询等服务，服务内容详见本平台相关产品介绍。</p>
		<p>4.1.2	您保证不会利用技术或其他手段破坏或扰乱本平台。</p>
		<p>4.1.3 您应尊重我方及其他第三方的知识产权和其他合法权利，并保证在发 生侵犯上述权益的违法事件时尽力保护 e 享时代及其股东、雇员、合作伙伴等免于 因该等事件受到影响或损失；我方保留您侵犯 e 享时代合法权益时终止向您提供服 务并不退还任何款项的权利。</p>
		<p>4.1.4 对由于您向我方提供的联络方式有误以及您用于接受我方邮件的电子 邮箱安全性、稳定性不佳而导致的一切后果，您应自行承担责任，包括但不限于因 您未能及时收到我方的相关通知而导致的后果和损失。</p>
		<p>4.1.5	您销售的商品或服务以及相关的咨询、投诉、产品质量责任、售后服

		务均由您依法独立承担经营者的责任，我方对此不承担任何责任；我方因此所遭受 的损失，您应向我方进行足额赔偿，我方有权暂扣应该分享给您的消费积分、让利 积分和再消费积分，直到我方 e 享时代会员权益得到足额赔偿。</p>
		<p>4.1.6	您对其销售的商品或服务有自主定价权，我方不干涉您的自主经营。</p>
		<p>4.1.7	您自行向我方相应系统录入商品或服务价格，并按此价格结算我方 e 享时代会员的消费总金额。</p>
		<p>4.1.8	如您销售商品或服务侵害了我方 e 享时代会员权益，经 e 享时代会员 投诉或举报的，我方有权根据情况单方解除本协议，并有权暂扣应该分享给您的消 费积分、让利积分和再消费积分，直到我方 e 享时代会员权益得到合法的
		补。</p>
		<p>4.2	您保证：</p>
		<p>4.2.1 您使用我方产品或服务时将遵从国家、地方法律法规、行业惯例和社 会公共道德，不会利用我方提供的服务进行存储、发布、传播如下信息和内容：违 反国家法律法规政策的任何内容（信息）；违反国家规定的政治宣传和/或新闻信 息；涉及国家秘密和/或安全的信息；封建迷信和/或淫秽、色情、下流的信息或教 唆犯罪的信息；博彩有奖、赌博游戏；违反国家民族和宗教政策的信息；妨碍互联 网运行安全的信息；侵害他人合法权益的信息和/或其他有损于社会秩序、社会治 安、公共道德的信息或内容;您同时承诺不得为他人发布上述不符合国家规定和/或 本服务协议约定的信息内容提供任何便利，包括但不限于设置 URL、BANNER 链 接等;</p>
		<p>4.2.2	使用我方产品或服务时，应遵守您与我方签订的服务协议、 在 e 享时 代网上平台上的管理规范、流程、服务说明、价格说明，包括但不限于：</p>
		<p>4.2.2. 1	您应本协议按时交付相关款项；</p>
		<p>4.2.2. 2 不应出现任何破坏或试图破坏网络安全的行为等；如您违反上述保 证，我方除有权根据相关服务协议采取删除信息、中止服务、终止服务的措施，并 有权限制您账户如部分或全部功能，如因您上述行为给 e 享时代造成损失的，您应 予赔偿。</p>
		<b>5、e 享时代的权利和义务</b>
		<p>5.1	我方根据您选择的服务以及交纳款项的情况向您提供合格的网络技术和 信息服务。</p>
		<p>5.2	我方承诺对您资料采取对外保密措施，不向第三方披露您资料，不授权 第三方使用您的资料，除非：</p>

		<p>5.2.1 依据本服务协议或者您与 e 享时代之间其他服务协议、合同、在线协 议等规定可以提供；</p>
		<p>5.2.2	依据法律法规的规定应当提供；</p>
		<p>5.2.3	行政、司法等职权部门要求我方提供；</p>
		<p>5.2.4	您同意我方向第三方提供；</p>
		<p>5.2.5	我方为解决举报事件、提起诉讼而提交的；</p>
		<p>5.2.6 我方为防止严重违法行为或涉嫌犯罪行为发生而采取必要合理行动所 必须提交的；</p>
		<p>5.2.7 我方为了向您提供产品、服务、信息而向第三方提供的，包括我方须 通过第三方的技术及服务向您提供产品、服务、信息的情况。</p>
		<p>5.3 我方有权根据本服务协议的约定，根据您的服务使用情况，自您的账户 余额中直接扣除相关服务费用。
		<p>5.4 当存在如下情形之一时，我方有权对您名下账户 e 享时代的会员积分予 以部分或全部进行冻结：</p>
		<p>5.4.1	国家法律、法规、政策、法律文书的规定；</p>
		<p>5.4.2	国家有权机关要求予以冻结的；</p>
		<p>5.4.3	您使用 e 享时代服务的行为涉嫌违反国家法律法规及行政规定的；</p>
		<p>5.4.4 我方基于单方面合理判断，认为您的账户操作、资金进出等存在异常 时；或认为可能产生风险的其他情况；</p>
		<p>5.4.5 他人向您账户错误转入 e 享时代会员积分等导致您可能存在不当得利 的；</p>
		<p>5.4.6 您遭到他人投诉，且对方已经提供了一定证据的；我方按照前述规定 对您的账户 e 享时代会员的积分予以冻结后，将通过邮件、站内信息、短信或电话 等方式通知您按照相应的程序进行申诉。如果您按照本服务协议第 3.8 条的要 求进行申诉并经我方审核通过的，将立即解除其 e 享时代会员积分冻结措施；如果 您未在规定时间内进行申请，或您的申诉未能通过我方审核的，则您确认我方有权 长期冻结该账户，或将相关冻结款项按原路退回该笔奖励资金的来源账户。</p>
		<p>5.4.7 当我方发现您方消费行为是假消费时；  我方按照前述规定对您的账 户 e 享时代会员积分进行冻结后，将通过邮件、站内信息、短信或电话等方式通知 您按照相应的程序进行申诉。如果您按照本服务协议第 3.6 条的要求进行申诉 并经我方审核通过的，将立即解除 e 享时代会员积分冻结措施；如果您未在规定时 间内进行申请，或您的申诉未能通过我方审核的，则您确认我方有权长期冻结该账

		户，或将相关冻结款项捐赠给 e 享时代的相关慈善基金。</p> 
		<b>6、隐私及其他个人信息的保护</b> 一旦您同意本服务协议或使用本服务，您即同意我方按照以下协议来使用和披
		露您的个人信息。</p>
		<p>6.1	银行账户信息 若我方所提供的服务需要您提供您的银行账户信息，在您提供相应信息后，我
		方将严格履行相关保密约定。</p> 
		<p>6.2	登录记录
		为了保障您使用本服务的安全以及不断改进服务质量，e 享时代将记录并保存 您登录和使用本服务的相关信息，但我方承诺不将此类信息提供给任何第三方（除 双方另有约定或法律法规另有规定及我方关联公司外）。</p>
		<p>6.3	广告
		我方会对 e 享时代用户的身份数据进行综合统计，并出于销售和消费分享的需 要而使用或披露。
		<p>6.4	外部链接 本平台如果含有到其他平台的链接，我方对其他平台的隐私保护措施不负任何
		责任。我方可能在任何需要的时候增加商业伙伴或共用品牌的平台。</p> 
		<p>6.5	安全
		我方仅按现有技术提供相应的安全措施来使 e 享时代平台掌握的信息不丢失、 不被滥用和变造。这些安全措施包括向其他服务器备份数据和对用户密码加密。尽 管有这些安全措施，但我方不保证这些信息的绝对安全。</p>
		<p>6.6 用户信息
		您完成账户注册或激活账户时，应向 e 享时代平台提供您的真实姓名、地址、 电话号码和电子邮件地址等信息，您还可以选择填写相关附加信息（包括但不限于 您公司所在的省份和城市、邮政编码、传真号码、个人照片和您的职务）。您同意 本协议时您即表明同意 e 享时代，及其代理公司为运作本服务而收集、使用和/或 披露和互相分享您的个人资料，并将这些个人信息披露给授权服务提供商和相关第 三方。</p>
		<p>6.7 您进一步同意 e 享时代：</p>
		<p>6.7.1. 向您发送定制化的信息或新产品/服务信息，通过电邮、电话（包括 语音电话、传真或信息，如果您表明我们可以以此方式联系您）；</p>
		<p>6.7.2.	出于为您提供增强或分析的统计功能使用您的个人信息，或者出于销售或鼓励的目的使用或披露个人信息。</p> 
		<b>7、系统中断或故障</b>
		<p>系统可能因下列状况无法正常运作，使您无法使用各项互联网服务时，我方不 承担损害赔偿责任，该状况包括但不限于：</p>
		<p>7.1	我方平台在系统停机维护期间。</p>
		<p>7.2	电信设备出现故障不能进行数据传输的。</p>
		<p>7.3	因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可抗力之因素， 造成 e 享时代系统障碍不能执行业务的。</p>
		<p>7.4	由于黑客攻击、电信部门技术调整或故障、平台升级、银行方面的问题 等原因而造成的服务中断或者延迟。</p>
		<b>8、责任范围及责任限制</b>
		<p>8.1	我方仅对本服务协议中列明的责任承担范围予以负责。</p>
		<p>8.2	本服务之合作单位，所提供之服务品质及内容由该合作单位自行负责。</p>
		<p>8.3 您了解并同意，因您使用本服务、违反本服务协议或在您的会员账户下 采取的任何行动，而导致的任何第三方索赔，由您本人承担。如果由此引起 e 享时 代及其关联公司、员工、客户和合作伙伴被第三方索赔的，您应负责处理，并承担 由此造成的全部责任和后果。</p>
		<p>8.4 在法律允许的情况下，e 享时代对于与本服务协议有关或由本服务协议引 起的任何间接的、惩罚性的、特殊的、派生的损失（包括业务损失、收益损失、利 润损失、使用数据、商誉或其他经济利益的损失），不论是如何产生的，也不论是 由对本服务协议的违约（包括违反保证）还是由侵权造成的，均不负有任何责任， 即使事先已被告知此等损失的可能性。另外即使本服务协议规定的排他性救济没有 达到其基本目的，也应排除 e 享时代对上述损失的责任。</p>
		<b>9、完整协议</b>
		<p>9.1	本服务协议由本服务协议与本平台公示的各项规则组成，相关名词可互 相引用参照，如有不同理解，以本服务协议为准。</p>
		<p>9.2	本服务协议的章节标题仅为行文方便而设，不具有法律或合同效力。</p>
		<p>9.3	您对本服务协议理解和认同，您即对本服务协议所有组成部分的内容理 解并认同，一旦您使用本服务，您和 e 享时代即受本服务协议所有组成部分的约束。</p>
		<p>9.4	本服务协议部分内容被有管辖权的法院认定为违法的，不因此影响其他 内容的效力。</p>
		<b>10、商标、知识产权的保护</b>

		<p>10.1	除第三方产品或服务外，本平台上所有内容，包括但不限于著作、图片、 档案、资讯、资料、架构、页面设计，均由 e 享时代或其关联企业依法拥有其知识 产权，包括但不限于商标权、专利权、著作权、商业秘密等。</p>
		<p>10.2	非经 e 享时代书面同意，任何人不得擅自使用、修改、复制、公开传播、 改变、散布、发行或公开发表本平台上程序或内容。</p>
		<p>10.3	尊重知识产权是您应尽的义务，如有违反，您应承担损害赔偿责任。</p>
		<b>11、通知送达</b>
		<p>11.1 您理解并同意，我方可依据自行判断，通过网页公告、电子邮件、手机 短信或常规的信件传送等方式向您发出通知，且我方可以信赖您所提供的联系信息 是完整、准确且当前有效的；上述通知于发送之日视为已送达收件人。</p>
		<p>11.2	除非本服务协议另有约定或我与您另行签订的协议明确规定了通知方式， 您发送给我方的通知，应当通过我方对外正式公布的通信地址、传真号码、电子邮 件地址等联系信息进行送达。</p>
		<b>12、法律适用与管辖</b>
		<p>12.1	本服务协议之效力、解释、变更、执行与争议解决均适用中华人民共和 国法律。</p>
		<p>12.2、双方因履行本合同产生争议的，应友好协商解决，协商不成提交深圳国 际仲裁院仲裁，仲裁采用简易程序。</p>
		<p>12.3、甲乙双方同意，与本协议有关的任何通知，以书面方式送达方为有效。 书面形式包括但不限于：传真、快递、邮件、电子邮件、手机短信、系统短信通知、 网页公告等。上述通知应被视为在下列时间送达：以电子邮件形式发出的，自电子 邮件进入对方邮件系统之时，视为通知到达；以传真形式发出的，以发送传真记录 时间为通知到达时间；以快递/书面邮件形式发出的，自对方签收之日或快递发出 之日起	5	日内视为通知到达。</p>
		<p>12.4、通知送达首页所列地点或传至首页传真号码或发至首页电子信箱视为有 效送达。</p>
		<p>12.5、特殊产品，根据产品特性另行制定附则。</p>
	</div>


</div>
</template>

<script>
import HeadTitle from '../common/title.vue'
export default {
	data () {
		return {
			modal: {
				text:'商学院',
				fixed: true
			},
			id: '1'
		}
	},
	computed: {
	},
	components: {
		HeadTitle
	},
	methods: {
		back () {
			this.$router.go(-1)
		}
	},
	created () {
		this.id = this.$route.params.id
	},
	destroyed () {
	}
}	
</script>

<style scoped>
.ex-word-cnt {margin: 0 4%; margin-top: 5rem; padding-bottom: 2rem;}
.ex-word-cnt h3{text-align: center; font-size: 2rem; padding: 2rem 0;}
.ex-word-cnt b{font-size: 1.6rem;display: inline-block; margin: 1rem 0;}
.ex-word-cnt p{line-height: 1.8; margin-bottom: 0.5rem; text-indent: 2rem; font-size: 1.4rem;}
.ex-word-cnt p.right {padding-left: 4rem;}
</style>
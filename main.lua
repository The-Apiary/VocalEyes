local info = [[
Press space bar to select a letter. Selecting "Done" submits the string, which will be displayed for 10 seconds.
]]

function love.load()
	font = love.graphics.newFont(68)
	alpha = {'a','e','i','o','u'}
	aGroup = {'a', 'b','c','d'}
	eGroup = {'e','f','g','h'}
	iGroup = {'i','j','k','l','m','n'}
	oGroup = {'o','p','q','r','s','t'}
	uGroup = {'u','v','w','x','y','z'}
	letterGroups = {
		a = aGroup,
		e = eGroup,
		i = iGroup,
		o = oGroup,
		u = uGroup
	}
	currGroup = alpha
	index = 1

	counter = 0
	limit = 1 --counter for moving index
	clear = 0

	res = "" --resulting string
	printStr = ""
end

function love.update(dt)
	counter = counter + dt
	if counter >= limit then
		index = index + 1
		counter = 0
	end
	if index > #currGroup+1 then
		index = 1
	end

	clear = clear + dt
	if clear > 10 then
		clear = 0
		printStr = ""
	end
end

function love.draw()
	love.graphics.print(info,0,0)

	local endStr = ""	
	local endX = 0
	local y = 0
	if currGroup == alpha then
		y = 50
		for _,v in ipairs(currGroup) do 
			love.graphics.print(v, 50, y)
			y = y + 50
		end
		endStr = "Done"
		endX = 50
	else
		y = 50
		for _,v in ipairs(alpha) do 
			love.graphics.print(v, 50, y)
			y = y + 50
		end
		
		y = 50
		for _,v in ipairs(currGroup) do
			love.graphics.print(v, 100, y)
			y = y + 50
		end
		endStr = "Back"
		endX = 100
	end
	love.graphics.print(endStr, endX, y)

	if index <= #currGroup then
		love.graphics.rectangle('line',endX-5, 50*index-5, 20,20)
	else
		love.graphics.rectangle('line', endX-5, 50*index-5, 40,20)
	end

	--Print out selected string
	love.graphics.print(res, 25, 500)

	--print out outputed string
	love.graphics.printf(printStr, 400, 50, 150, 'left')
end

function printf(str, ...)
	print(string.format(str, unpack(arg)))
end

function love.keypressed(key)
	if (key == ' ') then
		if index == #currGroup+1 then
			if currGroup ~= alpha then
				currGroup = alpha
				index = 1
				counter = 0
			else
				--output res!
				printStr = res
				res = ""
			end
		else
			if currGroup == alpha and letterGroups[currGroup[index]] then
				currGroup = letterGroups[currGroup[index]]
				index = 1
				counter = 0
			else
				res = res .. (currGroup[index] or "")
			end
		end
	end
end
describe('Sugar', function () {

  var rect

  beforeEach(function () {
    draw.attr('viewBox', null)
  })

  afterEach(function () {
    draw.clear()
  })

  describe('fill()', function () {
    beforeEach(function () {
      rect = draw.rect(100, 100)
    })

    afterEach(function () {
      rect.remove()
    })

    it('returns the node reference', function () {
      expect(rect.fill('red')).toBe(rect)
    })

    it('sets the given value', function () {
      expect(rect.fill('red').attr('fill')).toBe('red')
    })

    it('sets the given value with object given', function () {
      rect.fill({ color: 'red', opacity: 0.5, rule: 'odd' })
      expect(rect.attr('fill')).toBe('red')
      expect(rect.attr('fill-opacity')).toBe(0.5)
      expect(rect.attr('fill-rule')).toBe('odd')
    })

    it('returns fill color when called as getter', function () {
      rect.fill('red')
      expect(rect.fill()).toBe('red')
    })
  })

  describe('rotate()', function () {
    var rect, spy, undefined

    beforeEach(function () {
      rect = draw.rect(100, 100)
      spyOn(rect, 'transform')
    })

    afterEach(function () {
      rect.remove()
      rect.transform.calls.reset()
    })

    it('redirects to transform()', function () {
      rect.rotate(1, 2, 3)
      expect(rect.transform).toHaveBeenCalledWith({ rotate: 1, ox: 2, oy: 3 }, true)
    })
  })

  describe('skew()', function () {
    var rect, spy, undefined

    beforeEach(function () {
      rect = draw.rect(100, 100)
      spyOn(rect, 'transform')
    })

    afterEach(function () {
      rect.remove()
      rect.transform.calls.reset()
    })

    it('redirects to transform() with no argument', function () {
      rect.skew()
      expect(rect.transform).toHaveBeenCalledWith({ skew: [ undefined, undefined ], ox: undefined, oy: undefined }, true)
    })

    it('redirects to transform() with one argument', function () {
      rect.skew(5)
      expect(rect.transform).toHaveBeenCalledWith({ skew: 5, ox: undefined, oy: undefined }, true)
    })

    it('redirects to transform() with two argument', function () {
      rect.skew(5, 6)
      expect(rect.transform).toHaveBeenCalledWith({ skew: [ 5, 6 ], ox: undefined, oy: undefined }, true)
    })

    it('redirects to transform() with three arguments', function () {
      rect.skew(5, 6, 7)
      expect(rect.transform).toHaveBeenCalledWith({ skew: 5, ox: 6, oy: 7 }, true)
    })

    it('redirects to transform() with four arguments', function () {
      rect.skew(5, 6, 7, 8)
      expect(rect.transform).toHaveBeenCalledWith({ skew: [ 5, 6 ], ox: 7, oy: 8 }, true)
    })
  })

  describe('scale()', function () {
    var rect, spy, undefined

    beforeEach(function () {
      rect = draw.rect(100, 100)
      spyOn(rect, 'transform')
    })

    afterEach(function () {
      rect.remove()
      rect.transform.calls.reset()
    })

    it('redirects to transform() with no argument', function () {
      rect.scale()
      expect(rect.transform).toHaveBeenCalledWith({ scale: [ undefined, undefined ], ox: undefined, oy: undefined }, true)
    })

    it('redirects to transform() with one argument', function () {
      rect.scale(5)
      expect(rect.transform).toHaveBeenCalledWith({ scale: 5, ox: undefined, oy: undefined }, true)
    })

    it('redirects to transform() with two argument', function () {
      rect.scale(5, 6)
      expect(rect.transform).toHaveBeenCalledWith({ scale: [ 5, 6 ], ox: undefined, oy: undefined }, true)
    })

    it('redirects to transform() with three arguments', function () {
      rect.scale(5, 6, 7)
      expect(rect.transform).toHaveBeenCalledWith({ scale: 5, ox: 6, oy: 7 }, true)
    })

    it('redirects to transform() with four arguments', function () {
      rect.scale(5, 6, 7, 8)
      expect(rect.transform).toHaveBeenCalledWith({ scale: [ 5, 6 ], ox: 7, oy: 8 }, true)
    })
  })

  describe('translate()', function () {
    var rect, spy, undefined

    beforeEach(function () {
      rect = draw.rect(100, 100)
      spyOn(rect, 'transform')
    })

    afterEach(function () {
      rect.remove()
      rect.transform.calls.reset()
    })

    it('redirects to transform()', function () {
      rect.translate(1, 2)
      expect(rect.transform).toHaveBeenCalledWith({ translate: [ 1, 2 ] }, true)
    })
  })

  describe('flip()', function () {
    var rect, spy, undefined

    beforeEach(function () {
      rect = draw.rect(100, 100)
      spyOn(rect, 'transform')
    })

    afterEach(function () {
      rect.remove()
      rect.transform.calls.reset()
    })

    it('redirects to transform()', function () {
      rect.flip('x', 2)
      expect(rect.transform).toHaveBeenCalledWith({ flip: 'x', origin: 2 }, true)
    })

    it('sets flip to "both" when calling without anything', function () {
      rect.flip()
      expect(rect.transform).toHaveBeenCalledWith({ flip: 'both', origin: 'center' }, true)
    })

    // this works because only x and y are valid flip values. Evereything else flips on both axis
    it('sets flip to both and origin to number when called with origin only', function () {
      rect.flip(5)
      expect(rect.transform).toHaveBeenCalledWith({ flip: 'both', origin: 5 }, true)
    })
  })

  describe('matrix()', function () {
    var rect, spy, undefined

    beforeEach(function () {
      rect = draw.rect(100, 100)
      spyOn(rect, 'attr')
    })

    afterEach(function () {
      rect.remove()
      rect.attr.calls.reset()
    })

    it('redirects to attr() directly with one argument', function () {
      rect.matrix([ 1, 2, 3, 4, 5, 6 ])
      expect(rect.attr).toHaveBeenCalledWith('transform', new SVG.Matrix([ 1, 2, 3, 4, 5, 6 ]))
    })

    it('redirects to attr() directly with 6 arguments', function () {
      rect.matrix(1, 2, 3, 4, 5, 6)
      expect(rect.attr).toHaveBeenCalledWith('transform', new SVG.Matrix([ 1, 2, 3, 4, 5, 6 ]))
    })
  })

  describe('opacity()', function () {
    var rect, spy, undefined

    beforeEach(function () {
      rect = draw.rect(100, 100)
      spyOn(rect, 'attr')
    })

    afterEach(function () {
      rect.remove()
      rect.attr.calls.reset()
    })

    it('redirects to attr() directly', function () {
      rect.opacity(0.5)
      expect(rect.attr).toHaveBeenCalledWith('opacity', 0.5)
    })
  })

  describe('dx() / dy()', function () {
    var rect, spy, undefined

    beforeEach(function () {
      rect = draw.rect(100, 100)
      spyOn(rect, 'x').and.callThrough()
      spyOn(rect, 'y').and.callThrough()
    })

    afterEach(function () {
      rect.remove()
      rect.x.calls.reset()
      rect.y.calls.reset()
    })

    it('redirects to x() / y() with adding the current value', function () {
      rect.dx(5)
      rect.dy(5)
      expect(rect.x).toHaveBeenCalledWith(jasmine.objectContaining(new SVG.Number('5')))
      expect(rect.y).toHaveBeenCalledWith(jasmine.objectContaining(new SVG.Number('5')))
    })

    it('allows to add a percentage value', function () {
      rect.move('5%', '5%')

      rect.dx('5%')
      rect.dy('5%')

      expect(rect.x).toHaveBeenCalledWith(jasmine.objectContaining(new SVG.Number('10%')))
      expect(rect.y).toHaveBeenCalledWith(jasmine.objectContaining(new SVG.Number('10%')))
    })

    it('allows to add a percentage value when no x/y is set', function () {
      rect.dx('5%')
      rect.dy('5%')

      expect(rect.x).toHaveBeenCalledWith(jasmine.objectContaining(new SVG.Number('5%')))
      expect(rect.y).toHaveBeenCalledWith(jasmine.objectContaining(new SVG.Number('5%')))
    })
  })

  describe('dmove()', function () {
    var rect, spy, undefined

    beforeEach(function () {
      rect = draw.rect(100, 100)
      spyOn(rect, 'dx').and.callThrough()
      spyOn(rect, 'dy').and.callThrough()
    })

    afterEach(function () {
      rect.remove()
      rect.dx.calls.reset()
      rect.dy.calls.reset()
    })

    it('redirects to dx() / dy() directly', function () {
      rect.dmove(5, 5)
      expect(rect.dx).toHaveBeenCalledWith(5)
      expect(rect.dy).toHaveBeenCalledWith(5)
    })
  })

  describe('font()', function () {
    var text, spy, undefined

    beforeEach(function () {
      text = draw.text(loremIpsum)
      spyOn(text, 'leading')
      spyOn(text, 'attr')
    })

    afterEach(function () {
      text.remove()
      text.leading.calls.reset()
      text.attr.calls.reset()
    })

    it('sets leading when given', function () {
      text.font({ leading: 3 })
      expect(text.leading).toHaveBeenCalledWith(3)
    })

    it('sets text-anchor when anchor given', function () {
      text.font({ anchor: 'start' })
      expect(text.attr).toHaveBeenCalledWith('text-anchor', 'start')
    })

    it('sets all font properties via attr()', function () {
      text.font({
        size: 20,
        family: 'Verdana',
        weight: 'bold',
        stretch: 'wider',
        variant: 'small-caps',
        style: 'italic'
      })
      expect(text.attr).toHaveBeenCalledWith('font-size', 20)
      expect(text.attr).toHaveBeenCalledWith('font-family', 'Verdana')
      expect(text.attr).toHaveBeenCalledWith('font-weight', 'bold')
      expect(text.attr).toHaveBeenCalledWith('font-stretch', 'wider')
      expect(text.attr).toHaveBeenCalledWith('font-variant', 'small-caps')
      expect(text.attr).toHaveBeenCalledWith('font-style', 'italic')
    })

    it('redirects all other stuff directly to attr()', function () {
      text.font({
        foo: 'bar',
        bar: 'baz'
      })
      expect(text.attr).toHaveBeenCalledWith('foo', 'bar')
      expect(text.attr).toHaveBeenCalledWith('bar', 'baz')
    })

    it('sets key value pair when called with 2 parameters', function () {
      text.font('size', 20)
      expect(text.attr).toHaveBeenCalledWith('font-size', 20)
    })

    it('gets value if called with one parameter', function () {
      text.font('size')
      expect(text.attr).toHaveBeenCalledWith('font-size', undefined)
    })
  })

})
